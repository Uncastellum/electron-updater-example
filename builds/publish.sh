#!/bin/bash

log="./builds/$(date +%Y%m%d-%H.%M).log"

#version=$2
if [ "$1" == "-m" ]; then
  version=$(cat package.json | python -c "import sys, json; print(json.load(sys.stdin)['version'])")
  text=$2
elif [ "$1" == "-v" ]; then
  version=$2
  text=$3
else
  echo "Use: *.sh -v <version> [msg]"
  echo "     *.sh -m [msg]"
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)
repo_full_name=$(git config --get remote.origin.url | sed 's/.*:\/\/github.com\///;s/.git$//')
token=$(git config --global github.token)

generate_post_data()
{
  cat <<EOF
{
  "tag_name": "v$version",
  "target_commitish": "$branch",
  "name": "$version",
  "body": "$text",
  "draft": false,
  "prerelease": false
}
EOF
}

echo "Create release $version for repo: $repo_full_name branch: $branch" | tee -a $log
transfer=$(curl --data "$(generate_post_data)" "https://api.github.com/repos/$repo_full_name/releases?access_token=$token" | tee -a $log | grep "\"upload\_url\"\:")
echo "$transfer" >>$log
url="${transfer:17:-15}"
echo "" | tee -a $log
echo "Upload-API process to url \"$url\"" | tee -a $log
echo "Uploading \"RELEASES\" file . . ."  | tee -a $log
curl -H "Authorization: token $token" -H "Content-Type: application/octet-stream" --data-binary "@./builds/RELEASES" "${url}?name=RELEASES"  1>>$log
echo "" | tee -a $log
for file in $(ls ./builds | grep $version); do
  echo "Uploading \"$file\" file. . ." | tee -a $log
  curl -H "Authorization: token $token" -H "Content-Type: application/octet-stream" --data-binary "@./builds/$file" "${url}?name=${file}"  1>>$log
  echo "" | tee -a $log
done

echo "" | tee -a $log
echo "Done!" | tee -a $log

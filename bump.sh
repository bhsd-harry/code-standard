#!/usr/local/bin/bash
if [[ $2 == 'npm' ]]
then
	npm run build
	git add -A
	git commit -m "chore: publish $1 to npm"
	npm publish --tag ${3-latest}
else 
	npm run lint && npm run build
	if [[ $? -eq 0 ]]
	then
		git add -A
		git commit -m "chore: bump version to $1"
		git push
		git tag $1
		git push origin $1
	fi
fi

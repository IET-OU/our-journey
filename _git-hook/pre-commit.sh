#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

echo '>>' pre-commit hook ...

npm run build

if [[ $? -eq 0 ]]; then
	echo '>>' npm build OK
else
	echo '>>' npm build failed
	exit 1
fi

npm test

if [[ $? -eq 0 ]]; then
	echo '>>' npm test OK
else
	echo '>> npm test failed. Try "npm run fix"'
	exit 1
fi

exit 0

# End.

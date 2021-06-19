find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'


find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n\n/g' {file}

# 1s -> first line
# ^ ->first column
# replace with "use strict";
# break line
# add file content


## Web Tooling & Automation (udacity) - my learnings 
```
run npm install
on terminal run : npx gulp
```

###  autoprefixer
we can write our CSS rules without vendor prefixes
It will add automatically

###  browser sync

For auto re-loading webpage when file change (as of now reloads only on css change)


### seperating development and production files

Production release files will be kept inside dist folder



### changes

sass output to minified for compression
added seperate gulp for dev and prod
added gulp task for production

added babel transpiler


imagemin (&) imagemin-pngquant packages had vulnerabilities so dint install.
As a result images are not compressed
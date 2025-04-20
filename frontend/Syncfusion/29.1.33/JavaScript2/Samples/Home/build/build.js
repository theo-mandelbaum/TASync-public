'use strict';

var gulp = require('gulp');
var fs = require('fs');
var shelljs = require('shelljs');
var runSequence = require('gulp4-run-sequence');
require('./file');
var mapping = {
    'index': 'TypeScript',
    'javascript': 'JavaScript',
    'angular': 'Angular',
    'react': 'React',
    'vue': 'Vue',
    'aspnetmvc': 'ASP.NET MVC',
    'aspnetcore': 'ASP.NET Core'
};
var link = 'https://ej2.syncfusion.com/';
var keys = Object.keys(mapping);

/**
 * If beta release,change url path 
 */
var packJson = JSON.parse(fs.readFileSync('./package.json'));
link = packJson.isBeta ? 'https://ej2.syncfusion.com/beta/' : link;

/**
 * get current repository name 
 */
var currentRepo = shelljs.exec('git rev-parse --show-toplevel', {
        silent: true
    })
    .stdout.split('\n')[0].trim();
exports.currentRepo = currentRepo;

/**
 * Compile ts files
 */
 gulp.task('scripts', function (done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: require('typescript')
    });

    var tsResult = gulp.src(['./**/*.ts', './**/*.tsx', '!./node_modules/**/*.ts', '!./node_modules/**/*.tsx'], {
            base: '.'
        })
        .pipe(tsProject());
    tsResult.js.pipe(gulp.dest('./'))
        .on('end', function () {
            done();
        });
});


/**
 * Build ts and scss files
 */
gulp.task('build', gulp.series('scripts', 'access-search-files', function (done) {
    if (packJson.isBeta) {
        runSequence('beta-banner');
    }
    for (var i = 0; i < keys.length; i++) {
        var file = fs.readFileSync('./' + keys[i] + '.html', 'utf8');
        if (currentRepo.indexOf('repositories') !== -1) {
            file = file.replace(/{{:LINK}}/g, '../' + mapping[keys[i]]);
        } else {
            if (keys[i] === 'index') {
                file = file.replace(/{{:LINK}}/g, link + 'demos');
            } else if (keys[i] === 'aspnetmvc') {
                file = file.replace(/{{:LINK}}/g, 'https://ej2.syncfusion.com/aspnetmvc');
            } else if (keys[i] === 'aspnetcore') {
                file = file.replace(/{{:LINK}}/g, 'https://ej2.syncfusion.com/aspnetcore');
            } else {
                file = file.replace(/{{:LINK}}/g, link + keys[i] + '/demos');
            }
        }
        fs.writeFileSync('./' + keys[i] + '.html', file);
    }
    done();
}));

/**
 * Adding banner tag
 */
gulp.task('beta-banner', function(done) {
    for (var i = 0; i < keys.length; i++) {
        var file = fs.readFileSync('./' + keys[i] + '.html', 'utf8');
        var bannerString = `        <!-- beta banner -->
        <div class="no-ssh-key-message alert alert-warning alignment" id='beta-wrapper'style='margin:0px;'>
            Click <a class="alert-link" href="https://ej2.syncfusion.com/beta/${keys[i] === 'index' ? '' : keys[i]+'/demos/'}"> here </a> to view samples
            from Essential Studio beta release `+ packJson.version +`
            <span id='close' style='float:right;cursor: pointer' onclick='hide()'>x</span>
        </div>
        <script>
            function hide() {
                document.getElementById('beta-wrapper').style.display = 'none';
                var removeCss =document.getElementById('searching');
                removeCss.classList.remove('betasearch');
            }
        </script>
        <!-- End beta banner -->`
        file = file.replace(`<!-- beta banner -->`, bannerString);
        var scripts = `<script src="dist/index.min.js"></script>
        <script>
        var betaTag =document.getElementById('searching');
            betaTag.classList.add('betasearch');
            </script>`;
            file = file.includes('var betaTag') ? file : file.replace(`<script src="dist/index.min.js"></script>`, scripts);
        fs.writeFileSync('./' + keys[i] + '.html', file);
    }
    done();
})

// Task to hide the license banner in the base library files
gulp.task('hide-license', function (done) {
    if (process.env.samples === 'true') {
        console.log('Skipped the hide license task for ES Build');
        done();
    } else {
        try {
            let patternArray = ['it.validate()', 'licenseValidator.validate()'];
            let pathArray = [
                require.resolve('@syncfusion/ej2-base/dist/ej2-base.umd.min.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es5.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js'),
                require.resolve('@syncfusion/ej2-base/src/validate-lic.js')
            ];

            for (let i in pathArray) { replaceStringInFile(pathArray[i], patternArray[i === '0' ? 0 : 1], 'true'); }

        } catch (error) { if (error) console.log('Gulp task to hide license ', error); }
        done();
    }
});

function replaceStringInFile(filePath, pattern, replaceString) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            if (data && pattern && replaceString && data.includes(pattern)) {
                fs.writeFileSync(filePath, data.replace(pattern, replaceString), 'utf8');
            }
        }
    } catch (error) { if (error) console.log('replaceStringInFile function: ', error); }
}
exports.replaceStringInFile = replaceStringInFile;

gulp.task('ci-report', function(done){
    done();
})

/* jshint strict: false */
/* jshint undef: false */

const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    const platform = context.opts.cordova.platforms[0];

    if (platform === 'android') {

        const filesToCopy = [
            {
                src: path.join(context.opts.projectRoot, 'platformAddRmCopy', 'MoengageApplicationCopy.java'),
                dest: path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'java', 'trade', 'smart', 'stock', 'options', 'app', 'MoengageApplication.java')
            },
            {
                src: path.join(context.opts.projectRoot, 'platformAddRmCopy', 'build-extrasCopy.gradle'),
                dest: path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'build-extras.gradle')
            },
            // {
            //     src: path.join(context.opts.projectRoot, 'platformAddRmCopy', 'AndroidManifestCopy.xml'),
            //     dest: path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml')
            // }
        ];

        const manifestPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
        let manifestContent = fs.readFileSync(manifestPath, 'utf8');
        const attributeToRestore = 'android:name=".MoengageApplication" tools:replace="android:allowBackup"';
        const applicationTagRegex = /<application\s+([^>]*?)>/;
        const match = manifestContent.match(applicationTagRegex);

        if (match) {
            const applicationTag = match[0];
            if (!applicationTag.includes(attributeToRestore)) {
                const newApplicationTag = applicationTag.replace(/>$/, ` ${attributeToRestore}>`);
                const newManifestContent = manifestContent.replace(applicationTagRegex, newApplicationTag);
                fs.writeFileSync(manifestPath, newManifestContent, 'utf8');
            }
        }

        filesToCopy.forEach(file => {
            const destDir = path.dirname(file.dest);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            fs.copyFileSync(file.src, file.dest);
            console.log(`Copied ${file.src} to ${file.dest}`);
        });
    }
};

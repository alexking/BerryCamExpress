var express = require('express'),
    moment = require('moment'),
    fs = require('fs-extra'),
    mkdirp = require('mkdirp'),
    RaspiCam = require("raspicam"),
    app = express(),
    today = moment().format('YYYY-MM-DD'),
    baseFilename = 'berrycamimages/session_' + today,
    baseImageDirectory = __dirname + '/' + baseFilename,
    backupPath = baseImageDirectory + '_backup_' + moment().format('HHmmss'),
    fileExtension = '.jpg';

app.configure(function () {
    app.use(express.compress());
    app.use(express['static'](__dirname));
    app.use('/berrycamimages', express.directory('berrycamimages'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'macyrreb999'
    }));

    if (fs.existsSync(baseImageDirectory)) {
        fs.renameSync(baseImageDirectory, backupPath);
    } else {
        mkdirp.sync(baseImageDirectory, function (err) {
            if (err) {
                console.log('error creating dir', baseImageDirectory, err);
            }
        });
    }
});

app.get('/berrycam', function (req, res) {

    var opts = req.query,
        filename,
        sequenceNumber,
        camera,
        mode = opts.mode,
        timerStart;

    function padNumber(num) {
        var pad = '0000';
        return pad.substring(0, pad.length - num.toString().length) + num;
    }

    if (mode === 'photo') {

        sequenceNumber = ++req.session.imageSequence || 1;
        req.session.imageSequence = sequenceNumber;
        filename = baseFilename + '/' + padNumber(sequenceNumber) + fileExtension;
        opts.output = filename;
        camera = new RaspiCam(opts);

        camera.on("exit", function () {
            res.json({
                filename: filename
            });
        });

        camera.start();

    } else {

        filename = baseFilename + '/' + moment().format('HH-mm-ss') + '-%04d' + fileExtension;
        opts.output = filename;
        timerStart = opts.timerStart || 0;
        delete opts.timerStart;
        camera = new RaspiCam(opts);

        camera.on("exit", function () {
            console.log('time-lapse done', moment().format());
        });

        setTimeout(function () {
            camera.start();
        }, timerStart);

        res.json({
            data: 'done'
        });
    }

});

app.get('*', function (req, res) {
    res.send('Resource not found', 404);
});

app.use(function (err, req, res, next) {
    console.log('Error', err, req, res);
    if (req.xhr) {
        res.send(500, 'Error', err);
    } else {
        next(err);
    }
});

app.listen(3000);
console.log('B E R R Y C A M   E X P R E S S -- Listening on port 3000');

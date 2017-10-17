var express= require('express');
var app = express();

var port = process.env.port || 3000;

var list = [1,2,3,4];

var heatmapRouter = express.Router();

app.use(express.static('public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {title: 'Hello World', list : [1,2,3,4]} );
});

heatmapRouter.route('/')
    .get( function(req, res){
        res.render('heatmap');
    });

    
app.use('/heatmap', heatmapRouter);    

app.get('/hacks', function(req, res){
    //res.send('hacks');
    res.sendFile('C:/development/mathhacks/mathhacks/public/data/data.tsv');
});
app.listen(port, function(err) {
    console.log('running server on ' + port);
});
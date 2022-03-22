# mongoose-lean-{virtuals,defaults} Profiler

## Purposes

This script is to profile the performance impact when `mongoose-virtuals-lean` or `mongoose-lean-defaults` is applied.

## What it does?

This script run profiles the `find()` operation with different lean mode:

* Lean mode on
* Lean mode on with virtuals (This is of our interest!)
* Lean mode on with defaults (This is of our interest!)
* Lean mode off

## Preparing the Environment

What do we need?

* MongoDB (I'm using v5.0.6)
* Node (I'm using v14.17.0)
* Dependencies defined in package.json

### Step 1: Download IMDB Dataset

We need a sample dataset for run the profiler. Thus, I chose the IMDB dataset.

```sh
wget https://datasets.imdbws.com/title.basics.tsv.gz

mkdir imdb
gunzip title.basics.tsv.gz
mv title.basics.tsv ./imdb
```

### Step: Get MongoDB Ready

We will set up a MongoDB for profiling purpose. I prefer to have it run with docker-compose, which the `docker-compose.yml` file is in this repo as well. 

```sh
docker-compose up -d
```

Shell into our docker instance:

```sh
docker exec -it <container id> bash
```

We then import the dataset into our MongoDB instance.

```sh
cd data/imdb
mongoimport -u root -p root --authenticationDatabase admin --type tsv --headerline --db imdb --file ./title.basics.tsv
```

Try connecting to your MongoDB and see if the data are successfully imported.
```sh
mongo -u root -p root --authenticationDatabase admin imdb
```

In mongo shell, run:
```sh
> db.title_basic.count()
11105654
```

Up to now, your MongoDB is ready!

## Running the Profiler

Install all necessary dependencies:
```
npm install
```

```sh
node --max-old-space-size=8096 src/index.js
```
result :
```log
connected to mongoDB
Limit: 100000    Lean: true      Took: 1150
Limit: 100000    Lean: {"virtuals":true}         Took: 1190
Limit: 100000    Lean: {"defaults":true}         Took: 1187
Limit: 100000    Lean: false     Took: 5084
Limit: 100000    Lean: true      Took: 1098
Limit: 100000    Lean: {"virtuals":true}         Took: 1305
Limit: 100000    Lean: {"defaults":true}         Took: 1234
Limit: 100000    Lean: false     Took: 5230
Limit: 100000    Lean: true      Took: 1073
Limit: 100000    Lean: {"virtuals":true}         Took: 1246
Limit: 100000    Lean: {"defaults":true}         Took: 1222
Limit: 100000    Lean: false     Took: 5092
Limit: 100000    Lean: true      Took: 1063
Limit: 100000    Lean: {"virtuals":true}         Took: 1159
Limit: 100000    Lean: {"defaults":true}         Took: 1177
Limit: 100000    Lean: false     Took: 5106
Limit: 100000    Lean: true      Took: 1084
Limit: 100000    Lean: {"virtuals":true}         Took: 1160
Limit: 100000    Lean: {"defaults":true}         Took: 1447
Limit: 100000    Lean: false     Took: 5053
Limit: 100000    Lean: true      Took: 1031
Limit: 100000    Lean: {"virtuals":true}         Took: 1168
Limit: 100000    Lean: {"defaults":true}         Took: 1186
Limit: 100000    Lean: false     Took: 5025
Limit: 100000    Lean: true      Took: 1019
Limit: 100000    Lean: {"virtuals":true}         Took: 1143
Limit: 100000    Lean: {"defaults":true}         Took: 1174
Limit: 100000    Lean: false     Took: 5075
Limit: 100000    Lean: true      Took: 1037
Limit: 100000    Lean: {"virtuals":true}         Took: 1169
Limit: 100000    Lean: {"defaults":true}         Took: 1203
Limit: 100000    Lean: false     Took: 5227
Limit: 100000    Lean: true      Took: 1052
Limit: 100000    Lean: {"virtuals":true}         Took: 1151
Limit: 100000    Lean: {"defaults":true}         Took: 1153
Limit: 100000    Lean: false     Took: 5075
Limit: 100000    Lean: true      Took: 1039
Limit: 100000    Lean: {"virtuals":true}         Took: 1149
Limit: 100000    Lean: {"defaults":true}         Took: 1148
Limit: 100000    Lean: false     Took: 5017

    Average Runtime With Lean Mode On: 1064.6 
    Average Runtime With Lean Mode On with Virtuals: 1184 
    Average Runtime With Lean Mode On with Defaults: 1213.1 
    Average Runtime With Lean Mode Off: 5098.4
```

## Results
[![Deepin-Screenshot-select-area-20220330.png](https://i.postimg.cc/7h55ncgk/image.png)](https://postimg.cc/p5tV2sGG)

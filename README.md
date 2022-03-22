# mongoose-virtuals-lean Profiler

## Purposes

This script is to profile the performance impact when `mongoose-virtuals-lean` is applied.

## What it does?

This script run profiles the `find()` operation with different lean mode:

* Lean mode on
* Lean mode on with virtuals (This is of our interest!)
* Lean mode off

## Preparing the Environment

What do we need?

* MongoDB (I'm using v4.0.5)
* Node (I'm using v8.15.0)
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
Limit: 100000    Lean: true      Took: 1114
Limit: 100000    Lean: {"virtuals":true}         Took: 1207
Limit: 100000    Lean: false     Took: 4952
Limit: 100000    Lean: true      Took: 1059
Limit: 100000    Lean: {"virtuals":true}         Took: 1152
Limit: 100000    Lean: false     Took: 5076
Limit: 100000    Lean: true      Took: 1043
Limit: 100000    Lean: {"virtuals":true}         Took: 1160
Limit: 100000    Lean: false     Took: 4864
Limit: 100000    Lean: true      Took: 1029
Limit: 100000    Lean: {"virtuals":true}         Took: 1212
Limit: 100000    Lean: false     Took: 4821
Limit: 100000    Lean: true      Took: 1049
Limit: 100000    Lean: {"virtuals":true}         Took: 1159
Limit: 100000    Lean: false     Took: 4882
Limit: 100000    Lean: true      Took: 1018
Limit: 100000    Lean: {"virtuals":true}         Took: 1134
Limit: 100000    Lean: false     Took: 4772
Limit: 100000    Lean: true      Took: 1065
Limit: 100000    Lean: {"virtuals":true}         Took: 1158
Limit: 100000    Lean: false     Took: 4946
Limit: 100000    Lean: true      Took: 1028
Limit: 100000    Lean: {"virtuals":true}         Took: 1157
Limit: 100000    Lean: false     Took: 4787
Limit: 100000    Lean: true      Took: 1032
Limit: 100000    Lean: {"virtuals":true}         Took: 1167
Limit: 100000    Lean: false     Took: 4969
Limit: 100000    Lean: true      Took: 1040
Limit: 100000    Lean: {"virtuals":true}         Took: 1171
Limit: 100000    Lean: false     Took: 4829

    Average Runtime With Lean Mode On: 1047.7 
    Average Runtime With Lean Mode On with Virtuals: 1167.7 
    Average Runtime With Lean Mode Off: 4889.8
```

## Results
[![Deepin-Screenshot-select-area-20190114201705.png](https://i.postimg.cc/bvSJdFMc/Deepin-Screenshot-select-area-20190114201705.png)](https://postimg.cc/8FDD0wNt)

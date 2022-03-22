const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const mongooseLeanDefaults = require("mongoose-lean-defaults").default;
const Schema = mongoose.Schema;

// Modelled after imdb title dataset
// Link: https://datasets.imdbws.com/title.basics.tsv.gz
const titleSchema = new Schema(
  {
    genres: String,
    runtimeMinutes: Number,
    endYear: String,
    startYear: String,
    isAdult: Number,
    originalTitle: String,
    primaryTitle: String,
    tconst: String,
    titleType: String,
    someDummyDate: {
      type: Date,
      default: Date.now,
    },
  }
  // , {
  //     collection: 'title_basic'
  // }
);

titleSchema.virtual("isLong").get(function () {
  return this.runtimeMinutes ? this.runtimeMinutes > 30 : null;
});

titleSchema.plugin(mongooseLeanVirtuals);
titleSchema.plugin(mongooseLeanDefaults);

module.exports = titleSchema;

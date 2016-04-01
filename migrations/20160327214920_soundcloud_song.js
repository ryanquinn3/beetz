


var songStringFields = [
    'artwork_url',
    'attachments_uri',
    'description',
    'embeddable_by',
    'genre',
    'kind',
    'label_name',
    'license',
    'original_format',
    'permalink',
    'permalink_url',
    'purchase_title',
    'purchase_url',
    'release',
    'release_day',
    'release_month',
    'release_year',
    'sharing',
    'state',
    'stream_url',
    'tag_list',
    'title',
    'track_type',
    'uri',
    'video_url',
    'waveform_url',
    'isrc',
    'key_signature'
];

var songIntFields = [
    'bpm',
    'comment_count',
    'download_count',
    'duration',
    'id',
    'favoritings_count',
    'label_id',
    'original_content_size',
    'playback_count',
    'user_id'
];

var songBoolFields = [
    'commentable',
    'downloadable',
    'streamable'
];

var songDateFields = [
    'created_at',
    'last_modified'
];


exports.up = function(knex, Promise) {
  return knex.schema.createTable('soundcloudSong', function(table){

      songStringFields.forEach(function(field){
         table.string(field);
      });

      songIntFields.forEach(function(field){
         table.integer(field);
      });

      songBoolFields.forEach(function(field){
         table.boolean(field);
      });

      songDateFields.forEach(function(field){
         table.dateTime(field);
      });

      table.timestamp('updated_at').default(knex.fn.now());

      table.uuid('uuid').index().primary();

  });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('soundcloudSong');
};

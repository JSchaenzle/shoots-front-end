
export class WebRequestData {
  constructor(definition) {
    this.definition = definition;
  }

  extract(obj) {
    return this.definition.reduce((memo, field) => {
      var val = obj[field.source_key];
      if(field.required && !val) {
        console.error(`Missing required field: ${field.key}`);
      }
      memo[field.key] = val;
      return memo;
    }, {});
  }
}

class field {
  constructor(key, source_key) {
    this.key = key;
    this.source_key = source_key || key;
  }
}

export class required extends field {
  constructor(key, source_key) {
    super(key, source_key);
    this.required = true;
  }
}

export class optional extends field {
}
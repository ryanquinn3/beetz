<name>
  <h1>{ this.last }, { this.first }</h1>

    this.ctrl = opts.ctrl || {};
    this.last = 'Fred';
    this.first = 'hank';
    setTimeout(() => {
    this.ctrl.print()
    }, 1000);
</name>
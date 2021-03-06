//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from '_MyLibs/Util/Base.es6';

import Order from './Order.es6';

import Objects from './Objects/Controller.es6';
import Render from './Render/Render.es6';

export default class Controller extends Base {

  constructor(stage) {

    super();

    this.stage = stage;
    this.c = this.stage.canvas;

    this.setup();
    this.setEvents();

  }

  setup() {


    this.isUEv = true;
    this.isUpdate = true;

    this.obj = new Objects(this.stage);
    this.o = new Order(this.obj.len);

    var tl = new TimelineMax();

    tl
      .add(()=>{

        this.r = new Render(this.stage, this.obj);

      }, 0.5)

  }


  next() {

    this.o.go();

    this.r.next(this.o.current, this.o.next, this.o.prev);

  }

  prev() {

    this.o.back();

    this.r.prev(this.o.current);

  }

  update() {

  }

  timeline() {

    var tl = new TimelineMax();

    tl
      .add(()=>{

        this.r = new Render(this.stage, this.obj);
        this.autoSwitch();

      }, 1.0)
      .add(()=>{


      }, 2.0)

  }

  autoSwitch() {

    this.next();

    clearTimeout(this.Timer);
    this.Timer = setTimeout(()=>{
        
      this.autoSwitch();
      
    }, 3000);
  }

  setEvents() {

    var self = this;

    super.setEvents();

  }

}

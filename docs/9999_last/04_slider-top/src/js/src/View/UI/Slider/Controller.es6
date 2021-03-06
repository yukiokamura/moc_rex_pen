//--------------------------------------------------
//
//  Controller sss
//
//--------------------------------------------------

import Base from './Util/Base.es6';
import * as m from './Util/Math/index.es6';

import SliderImg from './SliderImg/Controller.es6';
import SpanText from './SpanText/Controller.es6';

import Swipe from './Swipe.es6';
import MouseDrag from './MouseDrag.es6';

export default class Controller extends Base {

  constructor() {

    super();

    this.setup()
    this.setEvents();

  }

  setup() {

    this.isUEv = true;
    this.isREv = true;

    this.s = new SliderImg($('.mv'), 'cv');
    this.slider = this.s.slider;
    this.st1 = new SpanText($('.text01'), $('.subtext01 .inner'), $('.tag01 .inner'), $('.more01 .inner'));
    this.st2 = new SpanText($('.text02'), $('.subtext02 .inner'), $('.tag02 .inner'), $('.more02 .inner'));
    this.st3 = new SpanText($('.text03'), $('.subtext03 .inner'), $('.tag03 .inner'), $('.more03 .inner'));
    this.st4 = new SpanText($('.text04'), $('.subtext04 .inner'), $('.tag04 .inner'), $('.more04 .inner'));
    this.sts = [];
    this.sts.push(this.st1,this.st2,this.st3,this.st4);
    this.$item = $('.indicator .item');

    this.index = 0;


    if (gb.u.dv.isSP) this.s = new Swipe($(window));
    else this.s = new MouseDrag($(window));

    this.isTimeline = false;
    this.isLock = false;
    this.isDrag = false;

    // swipe event
    this.s.onStart = ()=>{

      this.isDrag = true;

    }
    this.s.onMove = (sign, val)=>{

      if (!this.isDrag||val<10) return;
      if (this.isTimeline) return;
      this.isTimeline = true;
      this.isDrag = false; // 連続でさせるなら、ここをコメントアウト

      if (sign>0) {
        this.next();
      } else {
        this.prev();
      }

    }
    this.s.onEnd = ()=>{

      this.isDrag = false;

    }
    this.s.onSwipe = (sign)=>{


    }

    this.timeline();

  }

  update() {

  }

  timeline() {

    if (this.tl) this.tl.kill();
    this.tl = new TimelineMax({repeat: -1, delay: 3.0, repeatDelay: 3.0});

    this.tl
      // show
      .add(()=>{

        this.next();
        
      }, 0.0)
      .add(()=>{

        this.isTimeline = false;

      }, 0.1)

  }

  next(isItem=false, index) {

    if (this.tl) this.tl.kill();
    this.tl = new TimelineMax();

    this.tl
      .add(()=>{

        // text
        this.sts[this.index].hide_op('next');

        // index
        if (!isItem) {
          var prevIndex = this.index - 1;
          if (prevIndex<0) prevIndex = this.sts.length - 1;
          this.sts[prevIndex].cancel();
          this.sts[this.index].cancel();
          this.index++;
        } else {
          var prevIndex = this.index - 1;
          if (prevIndex<0) prevIndex = this.sts.length - 1;
          this.sts[prevIndex].cancel();
          this.sts[this.index].cancel();  
          this.index = index;
        }
        this.index = this.index % this.sts.length;      

        // indicator
        this.$item.removeClass('active')
        this.$item.eq(this.index).addClass('active');
        

      }, 0.0)
      .add(()=>{
            
        // text
        this.sts[this.index].show_op('next');
          // img
        this.slider.next_op(isItem, this.index);

      }, 0.1)
      .add(()=>{
            
        this.isTimeline = false;
        this.timeline();

      }, 0.3)
    
  }

  prev(isItem=false, index) {

    if (this.tl) this.tl.kill();
    this.tl = new TimelineMax();

    this.tl
      .add(()=>{

        // text
        this.sts[this.index].hide_op('prev');

        // index
        if (!isItem) {
          var prevIndex = this.index - 1;
          if (prevIndex<0) prevIndex = this.sts.length - 1;
          this.sts[prevIndex].cancel();
          this.sts[this.index].cancel();
          this.index--;
        } else {
          var prevIndex = this.index - 1;
          if (prevIndex<0) prevIndex = this.sts.length - 1;
          this.sts[prevIndex].cancel();
          this.sts[this.index].cancel();
          this.index = index;
        }
        if (this.index<0) this.index = this.sts.length - 1;

        // indicator
        this.$item.removeClass('active')
        this.$item.eq(this.index).addClass('active');


      }, 0.0)
      .add(()=>{
          
        // text
        this.sts[this.index].show_op('prev');
          // img
        this.slider.prev_op(isItem, this.index);

      }, 0.1)
      .add(()=>{
          
        this.isTimeline = false;
        this.timeline();

      }, 0.3)

  }

  onResize() {


  }

  onItem(that) {

    var index = this.$item.index(that);

    if (index>this.index) {
      this.next(true, index);
    }
    if (index<this.index) {
      this.prev(true, index);
    }

  }

  setEvents() {

    super.setEvents();

    var self = this;

    this.$item.on('click', function(){self.onItem.call(self, this)});

  }

}
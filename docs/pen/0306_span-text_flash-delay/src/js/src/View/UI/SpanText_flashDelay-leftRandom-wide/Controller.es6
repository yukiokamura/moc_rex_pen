//--------------------------------------------------
//
//  SpanText
//
//--------------------------------------------------

import SetSpan from './SetSpan.es6';

import * as a from 'Util/Array/index.es6';
import * as m from 'Util/Math/index.es6';

export default class SpanText {

  constructor($wrap) {

    this.$wrap = $wrap
    this.$target = $wrap.find('div');

    this.setup();
    this.setEvents();

  }

  setup() {

    this.$wrap.css({
        // overflow: 'hidden',
        cursor: 'pointer'
    });

    this.w = this.$wrap.innerWidth();
    this.h = this.$wrap.innerHeight();

    // spanで1文字1文字囲む
    this.s = new SetSpan(this.$target);

    // // 各spanを取得
    this.$span = this.$target.find('.oh');
    this.$span.css('display', 'inline-block'); // spanはinline-blockかblockじゃないとtnraslateが効かないので、styleつける
    this.$spant = this.$target.find('.t');
    this.$spano = this.$target.find('.overlay');
    this.len = this.$span.length;
    this.$wrap.css('opacity', 1);

    this.ready();
    this.timeline();

  }

  ready() {

    var w = this.$span.eq(0).width();
    var h = this.$span.eq(0).height();

    // text
    this.$spant.each((index, el)=>{

      // TweenMax.set(this.$spant.eq(index), {x: w});
      
    });

    // overlay
    this.$span.each((index, el)=>{

      var w = $(el).width();
      var h = $(el).height();

      TweenMax.set(this.$spano.eq(index), {width: w,height: h});
      
    });

  }

  show () {

    var arr = a.randomArr(this.len);

    this.$spano.each((index, el)=>{

      var dur = 0.02;
      var times = 7;
      var rate = index / this.len;

      // 左からじょじょにdelay
      // var rater = rate;
      var rater = (Power1.easeOut).getRatio(rate);
      var target = 0.8;
      var delay = Math.random() * (target - rater) + rate;
      delay *= 1.0;
      delay = Math.max(0, delay);

      // easeを使ってdelay
      // var delay = (Power1.easeOut).getRatio(rate);

      var tl = new TimelineMax({delay: delay});

      tl
        .add(()=>{
          this.$spano.eq(index).addClass('flashD');
        }, 0.0)
        .add(()=>{
          TweenMax.set(this.$spant.eq(index), {opacity: 1});
        }, dur * times)
      
    });
    
  }

  hide () {

    
  }

  timeline() {

    var tl = new TimelineMax();

    tl
      .add(()=>{

        this.show();

      }, 3.0)

  }

  setEvents() {

  


  }

}
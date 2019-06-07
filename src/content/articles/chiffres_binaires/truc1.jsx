import React, { Component } from 'react'
import style from './addition.module.css'
import range from 'lodash/range'
import { AnimButton } from 'components/AnimButton.jsx'
import anime from 'animejs'

async function animate(props, resolve) {
  await new Promise(resolve => anime({ ...props, complete: resolve }));
}


export default class Additor extends Component {
  constructor(props) {
    super(props);
    this.c727 = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1];
    this.c728 = [1, 0, 1, 1, 0, 1, 1, 0, 0, 0];
    this.die = range(this.c727.length).map(_ => React.createRef())
    this.dig = range(this.c727.length).map(_ => React.createRef())
    this.dih = range(5).map(_ => React.createRef())
    this.hasRun = false
  }

  async anim(waiter) {
    await waiter();

    if (this.hasRun) {
      await animate({
        targets: this.dig.map((v, _) => v.current),
        opacity: 0,
        duration: 500,
        easing: 'easeInOutSine',
        delay: anime.stagger(40)
      });
    }

    let i = 9;
    for (i = 9; i > 5; --i) {
      await animate({
        targets: this.die[i].current,
        scale: 1.3,
        duration: 500,
        easing: "easeOutSine"
      });
      await animate({
        targets: this.die[i].current,
        scale: [1.3, 1],
        duration: 500,
        easing: "easeOutSine"
      });

      await animate({
        targets: this.dih[i - 5].current,
        scale: 1.3,
        opacity: [i === 9 ? 1 : 0.6, i === 9 ? 1 : 0.6],
        duration: 500,
        easing: 'easeOutSine',
      });
      await animate({
        targets: this.dih[i - 5].current,
        scale: [1.3, 1],
        duration: 500,
        easing: 'easeOutSine',
      });

      await animate({
        targets: [this.dih[i - 6].current, this.dig[i].current],
        scale: 1.3,
        opacity: 1,
        duration: 500,
        easing: 'easeOutSine',
      });

      if (i < 9) {
        anime({
          targets: this.dih[i - 5].current,
          opacity: [i === 9 ? 1 : 0.6, 0],
          duration: 400,
          delay: 300,
          easing: 'easeOutSine',
        })
      }

      await animate({
        targets: [this.dih[i - 6].current, this.dig[i].current],
        scale: [1.3, 1],
        opacity: 1,
        duration: 500,
        easing: 'easeOutSine',
      });

      await animate({
        targets: this.dih[i - 6].current,
        scale: 1,
        opacity: [1, 0.6],
        top: 28,
        duration: 500,
        easing: 'easeOutSine',
      });

      if (i > 6) { await waiter(); } else {
        anime({
          targets: this.dih[0].current,
          opacity: 0,
          duration: 400,
          delay: 300,
          easing: 'easeOutSine',
        })
      }
    }

    for (i = 5; i >= 0; --i) {
      await waiter();

      await animate({
        targets: this.dig[i].current,
        top: 57,
        opacity: 1,
        duration: 1000,
      });
    }

    this.hasRun = true

  }

  render() {
    return (
      <>
        <div className={style.addition} width="100%">
          <div style={{ position: "absolute", borderBottom: "1px solid #000", left: 0, top: 56, width: 144 }}></div>
          {this.c727.map((char, index) =>
            <code key={index} style={{ top: 0, left: 12 * (index + 2) }} ref={this.die[index]}>{char}</code>)
          }
          {this.c728.map((char, index) =>
            <code key={index} style={{ top: index < 6 ? 0 : 57, left: 12 * (index + 2), opacity: 0 }} ref={this.dig[index]}>{char}</code>
          )}
          <code style={{ left: 0, top: 28 }}>+</code>
          {range(4).map(i =>
            <code style={{ left: 12 * (i + 7), top: 57, opacity: 0 }} key={i} ref={this.dih[i]}> {i === 0 ? 0 : 1}</code>
          )}
          <code style={{ left: 132, top: 28 }} ref={this.dih[4]}>1</code>
        </div>
        <AnimButton
          anim={this.anim.bind(this)}
          disabled={false}
        />
      </>
    )
  }
}

// <style>
//   #addition {
//     position: relative;
//     /*background-color: #fff;*/
//     width: 144px;
//     height: 84px;
//     // margin: 0px;
//     padding: 0px;
//     border: 0px solid #ddd;
//     display: table;
//     margin: 0 auto;
//   }
//   #addition code {
//     display:inline-block;
//     position: absolute;
//     font-size: 18px;
//     vertical-align: text-bottom;
//     line-height: 28px;
//     width: 12px;
//     color: #000;
//     opacity: 1;
//     text-align: center;
//   }
//   #addition code.invisible {
//     opacity: 0;
//   }
// </style>

// <div style="padding: 20px 0px;">
//   <div id="addition" class="align-center" width="100%">
//   <div style="position: absolute; border-bottom: 1px solid #000; left: 0px; top: 56px; width: 144px;"></div></div>
// </div>

// <script>
//   (function () {
//     const c727 = "1011010111";
//     const c728 = "1011011000";
//     var addition = document.getElementById("addition");

//     var plus = document.createElement('code');
//     plus.style.left = "0px" ;
//     plus.style.top = "28px" ;
//     plus.innerHTML = "+";
//     addition.appendChild(plus);

//     var digplus1 = document.createElement('code');
//     digplus1.style.left = "132px" ;
//     digplus1.style.top = "28px" ;
//     digplus1.innerHTML = "1";
//     digplus1.id = "dih9";
//     addition.appendChild(digplus1);

//   for (var i = 5; i < 9; i++) {
//     var digit = document.createElement('code');
//     digit.style.left = 12 * (i + 2) + "px" ;
//     digit.style.top = "57px" ;
//     // digit.style.transform = "translateY(29px)";
//     digit.innerHTML = i == 5 ? "0" : "1";
//     digit.id = "dih" + i;
//     digit.classList.add("invisible");
//     addition.appendChild(digit);
//   }

//   var adtimeline = anime.timeline({loop: true});
//   for (var i = 9; i > 5; i--) {
//     adtimeline.add({
//       targets: ['#die' + i],
//       scale: 1.3,
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     adtimeline.add({
//       targets: ['#die' + i],
//       scale: [1.3, 1],
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     adtimeline.add({
//       targets: ['#dih' + i],
//       scale: 1.3,
//       opacity: [i == 9?1:0.6, i == 9?1:0.6],
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     adtimeline.add({
//       targets: ['#dih' + i],
//       scale: [1.3, 1],
//       opacity: [i == 9?1:0.6, i == 9?1:0.6],
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     adtimeline.add({
//       targets: ['#dig' + i, '#dih' + (i - 1)],
//       scale: 1.3,
//       opacity: 1,
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     adtimeline.add({
//       targets: ['#dig' + i, '#dih' + (i - 1)],
//       scale: 1,
//       opacity: [1, 1],
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//     if (i < 9) {
//       adtimeline.add({
//       targets: ['#dih' + i],
//       opacity: [i == 9 ? 1 : 0.6, 0],
//       duration: 500,
//       easing: 'easeOutSine',
//       offset: '-=500',
//     });
//     }
//     adtimeline.add({
//       targets: ['#dih' + (i - 1)],
//       scale: 1,
//       opacity: [1, 0.6],
//       top: '28px',
//       duration: 500,
//       easing: 'easeOutSine',
//     });
//   }

//   adtimeline.add({
//       targets: '#dih5',
//       opacity: [0.6, 0],
//       delay: 500,
//       duration: 500,
//       easing: 'easeOutSine',
//       // offset: '-=500',
//     });

//   for (i = 5; i >= 0; --i) {
//     adtimeline.add({
//       targets: '#dig' + i,
//       top: '57px',
//       opacity: 1,
//       duration: 1000,
//       offset: '-=' + (i < 5 ? 300 : 1000)
//     });
//   }

//   adtimeline.add({
//     targets: ['#dig0', '#dig1', '#dig2', '#dig3', '#dig4', '#dig5', '#dig6', '#dig7', '#dig8', '#dig9'],
//     opacity: 0,
//     delay: 2000,
//     duration: 2000,
//     easing: 'easeInOutSine'
//   });

//   // L'animation n'est active que si elle est visible.
//   adtimeline.pause();
//   $('#addition').bind('appear', function() {
//     adtimeline.play();
//   });
//   $('#addition').bind('appearing', function() {
//     adtimeline.play();
//   });
//   $('#addition').bind('disappear', function() {
//     adtimeline.pause();
//   });
// })();
// </script>

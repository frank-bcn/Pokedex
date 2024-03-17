import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimation', [
  transition('start => pokedex', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(':enter', [
        style({
          transform: 'scale(0.8) rotate(15deg) translateX(-100%)',
          opacity: 0,
        }),
      ]),
      query(':leave', [style({ zIndex: 1 })], { optional: true }),
    ]),
    group([
      query(':enter', [
        animate(
          '800ms cubic-bezier(0.68,-0.55,0.27,1.55)',
          style({
            transform: 'scale(1) rotate(0) translateX(0)',
            opacity: 1,
          })
        ),
      ]),
      query(':leave', [
        animate('800ms cubic-bezier(0.68,-0.55,0.27,1.55)', style({ opacity: 0 }))
      ], { optional: true }),
    ]),
  ]),
]);
import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, endWith, interval, map, Subscription, switchMap, takeWhile } from 'rxjs';

const easeOutQuad = (x: number): number => x * (2 - x)

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(2000);
  private subscription$: Subscription;

  private readonly currentCount$ = combineLatest([
    this.count$,
    this.duration$,
  ]).pipe(
    switchMap(([count, duration]) => {
      // get the time when animation is triggered
      const startTime = animationFrameScheduler.now();

      return interval(0, animationFrameScheduler).pipe(
        // calculate elapsed time
        map(() => animationFrameScheduler.now() - startTime),
        // calculate progress
        map((elapsedTime) => elapsedTime / duration),
        // complete when progress is greater than 1
        takeWhile((progress) => progress <= 1),
        // apply quadratic ease-out function
        // for faster start and slower end of counting
        map(easeOutQuad),
        // calculate current count
        map((progress) => Math.round(progress * count)),
        // make sure that last emitted value is count
        endWith(count),
        distinctUntilChanged()
      );
    }),
  );

  @Input()
  set count(count: number) {
    this.count$.next(count)
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration)
  }

  @Input() timeout: number;

  constructor(    
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) { }

    ngOnInit(): void {
      this.displayCurrentCount();
    }

    ngOnDestroy(): void {
      // this.currentCount$.subscribe().unsubscribe();
      if (this.subscription$) {
        console.log('test')
        this.subscription$.unsubscribe();
      }
    }
  
    private displayCurrentCount(): void {
      setTimeout(() => {
       this.subscription$ = this.currentCount$
          // .pipe(takeUntil(this.currentCount$))
          .subscribe((currentCount) => {
            this.renderer.setProperty(
              this.elementRef.nativeElement,
              'innerHTML',
               `+${currentCount}`
            );
          });
      }, this.timeout);
    }

}

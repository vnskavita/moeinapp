import { NavOptions, createAnimation } from '@ionic/core';
import { GlobalConstants } from './common/global-constants';
interface TransitionOptions extends NavOptions {
  progressCallback?: (ani: Animation | undefined) => void;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}

function getIonPageElement(element: HTMLElement) {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  const ionPage = element.querySelector(
    ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
  );
  if (ionPage) {
    return ionPage;
  }

  return element;
}

export function pageTransition(_: HTMLElement, opts: TransitionOptions) {
  const DURATION = 300;

  const rootTransition = createAnimation()
    .duration(opts.duration || DURATION)
    .easing('cubic-bezier(0.3,0,0.66,1)');

  const enteringPage = createAnimation()
    .addElement(getIonPageElement(opts.enteringEl))
    .beforeRemoveClass('ion-page-invisible');

  const leavingPage = createAnimation().addElement(
    getIonPageElement(opts.leavingEl)
  );
  if (!GlobalConstants.animationFlag) {
    if (opts.direction === 'forward') {
      enteringPage.fromTo('transform', 'translateX(100%)', 'translateX(0)');
      leavingPage.fromTo('opacity', '0', '0');
    } else {
      leavingPage.fromTo('transform', 'translateX(0)', 'translateX(100%)');
      enteringPage.fromTo('opacity', '0', '0');
    }
  }

  rootTransition.addAnimation(enteringPage);
  rootTransition.addAnimation(leavingPage);
  return rootTransition;
}

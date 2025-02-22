import { type ZapperMethods } from './types';

const SCREEN_WIDTH = 256;

class Zapper {
  handleMove: ZapperMethods['handleMove'];

  handleFireDown: ZapperMethods['handleFireDown'];

  handleFireUp: ZapperMethods['handleFireUp'];

  constructor(methods: ZapperMethods) {
    this.handleMove = methods.handleMove;
    this.handleFireDown = methods.handleFireDown;
    this.handleFireUp = methods.handleFireUp;
  }

  fireDown(e: PointerEvent) {
    const { clientX, clientY, target } = e;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const scale = target.clientWidth / SCREEN_WIDTH;
    const x = Math.round((clientX - rect.left) / scale);
    const y = Math.round((clientY - rect.top) / scale);
    this.handleMove(x, y);
    this.handleFireDown();
  }

  fireUp() {
    this.handleFireUp();
  }
}

export default Zapper;

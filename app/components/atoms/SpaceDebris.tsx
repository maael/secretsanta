import React from "react";

export default class SpaceDebris extends React.Component {
  public state = {
    size: 0,
  };

  private raf?: number;
  private el?: HTMLDivElement | null;
  private speed = 0;
  private deltaX = this.speed;
  private deltaY = this.speed;
  private container?: Element;

  public componentDidMount() {
    this.container =
      window.document.body.querySelector("#container") || window.document.body;
    const height = this.container.clientHeight;
    const width = this.container.clientWidth;
    const size =
      Math.floor(Math.random() * Math.floor(Math.min(height, width) / 8)) +
      Math.floor(Math.min(height, width) / 10);
    this.speed = Math.max(
      Math.floor(Math.random() * Math.floor(size / 50)) + Math.floor(size / 70),
      1,
    );
    this.deltaX = [-1, 1][Math.floor(Math.random() * 2)] * this.speed;
    this.deltaY = [-1, 1][Math.floor(Math.random() * 2)] * this.speed;
    if (this.el && this.container) {
      this.el.style.left = `${Math.floor(
        Math.random() * this.container.clientWidth,
      )}px`;
      this.el.style.top = `${Math.floor(
        Math.random() * this.container.clientHeight,
      )}px`;
    }
    this.setState({ size });
    this.animationLoop();
  }

  public componentWillUnmount() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }

  public render() {
    const { children } = this.props;
    const { size } = this.state;
    const style = {
      display: !!size ? "block" : "none",
      height: size,
      position: "absolute" as "absolute",
      width: size,
    };
    return (
      <div style={style} ref={el => (this.el = el)}>
        {children}
      </div>
    );
  }

  private animationLoop() {
    this.raf = window.requestAnimationFrame(() => {
      if (this.el && this.container) {
        if (this.el.offsetLeft > this.container.clientWidth - this.state.size) {
          this.deltaX = -this.speed;
        } else if (this.el.offsetLeft < 0) {
          this.deltaX = this.speed;
        }
        if (this.el.offsetTop > this.container.clientHeight - this.state.size) {
          this.deltaY = -this.speed;
        } else if (this.el.offsetTop < 0) {
          this.deltaY = this.speed;
        }
        this.el.style.left = this.el.style.left
          ? `${Number(this.el.style.left.slice(0, -2)) + this.deltaX}px`
          : "1px";
        this.el.style.top = this.el.style.top
          ? `${Number(this.el.style.top.slice(0, -2)) + this.deltaY}px`
          : "1px";
      }
      this.animationLoop();
    });
  }
}

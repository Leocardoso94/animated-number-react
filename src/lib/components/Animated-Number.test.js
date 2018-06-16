import React from 'react';
import { shallow } from 'enzyme';
import AnimatedNumber from './Animated-Number';

describe('AnimatedNumber.vue', () => {
  const durationOfAnimation = 1000;
  const value = 1500;

  it('renders props.value when passed', (done) => {
    const wrapper = shallow(<AnimatedNumber value={value} />);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(value.toString());
      done();
    }, durationOfAnimation + 100);
  });

  it('renders the correct value when the duration is equal 100', (done) => {
    const duration = 100;
    const wrapper = shallow(<AnimatedNumber value={value} duration={duration} />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(value.toString());
      done();
    }, duration + 100);
  });

  it('respect the time of the delay', (done) => {
    const delay = 50;
    const duration = 10;
    const wrapper = shallow(<AnimatedNumber value={value} duration={duration} delay={delay} />);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toBe('0');
    }, delay);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(value.toString());
      done();
    }, 2000);
  });

  it('should return a "test" when formatValue function is called', () => {
    const formatValue = () => 'test';
    const wrapper = shallow(<AnimatedNumber value={value} formatValue={formatValue} />);
    wrapper.update();
    const formatedValue = wrapper.instance().props.formatValue(value);
    expect(formatedValue).toBe('test');
  });

  it('renders $ 10.00  when a format function is passsed', (done) => {
    const formatValue = value_ => `$ ${value_.toFixed(2)}`;
    const wrapper = shallow(<AnimatedNumber value={value} formatValue={formatValue} />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(`$ ${value}.00`);
      done();
    }, durationOfAnimation + 100);
  });

  it('should call the animateValue when props.value change ', () => {
    const wrapper = shallow(<AnimatedNumber value={value} />);
    const spy = jest.spyOn(wrapper.instance(), 'animateValue');
    wrapper.setProps({ value: 123 });
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });

  it('should call the props.begin before animation start', (done) => {
    let isNotStarted = false;

    shallow(<AnimatedNumber
      value={value}
      begin={(anim) => {
          isNotStarted = anim.progress === 0;
        }}
    />);

    setTimeout(() => {
      expect(isNotStarted).toBe(true);
      done();
    }, durationOfAnimation);
  });

  it('should call the props.complete when the animation is completed', (done) => {
    let isAnimationCompleted = false;

    shallow(<AnimatedNumber
      value={value}
      complete={(anim) => {
          isAnimationCompleted = anim.progress === 100;
        }}
    />);

    setTimeout(() => {
      expect(isAnimationCompleted).toBe(true);
      done();
    }, durationOfAnimation + 100);
  });

  it('should call the props.update multiple times when the animation is playing', (done) => {
    let counter = 0;

    shallow(<AnimatedNumber
      value={value}
      update={() => {
          counter += 1;
        }}
    />);

    setTimeout(() => {
      expect(counter).toBeGreaterThan(30);
      done();
    }, durationOfAnimation + 100);
  });

  it('should call the props.run multiple times when the animation is playing after delay is finished', (done) => {
    let counter = 0;
    shallow(<AnimatedNumber
      value={value}
      delay={50}
      run={() => {
          counter += 1;
        }}
    />);

    setTimeout(() => {
      expect(counter).toBeGreaterThan(30);
      done();
    }, durationOfAnimation + 100);

    setTimeout(() => {
      expect(counter).toBe(0);
      done();
    }, 55);
  });
});

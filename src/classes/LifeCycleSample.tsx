import React, { Component } from "react";

export interface StateProps {
  number: number;
  color: string | null;
}
export default class LifeCycleSample extends Component {
  state: StateProps = {
    number: 0,
    color: null,
  };

  myRef = null;

  constructor(props: { color: string }) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(
    nextProps: { color: string },
    prevState: { color: string }
  ) {
    // getDerivedStateFromProps는 props로 받아온 값을 state에 동기화시키는 용도로 사용
    // -> 부모에게서 받은 color 값을 state에 동기화
    // 컴포넌트가 마운트될 때와 업데이트될 때 호출
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
  }

  componentDidMount(): void {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(
    nextProps: any,
    nextState: { number: number },
    nextContext: any
  ): boolean {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount(): void {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(
    prevProps: { color: string },
    prevState: { color: string }
  ) {
    // getSnapshotBeforeUpdate는 render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출
    // -> DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게 함
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log("componentDidUpdate");
    if (snapshot) {
      console.log("업데이트되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

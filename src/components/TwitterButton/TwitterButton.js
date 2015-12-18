import React from 'react';

/**
 * This component renders directly the iframe of twitter without running external script
 * to avoid messing up with react's internal DOM and break react hot loader
 *
 * @todo make a more generic version
 * @note : <a href="https://twitter.com/share" className="twitter-share-button" data-text="Simple #reactjs #es6 project using Github API" data-via="topheman" data-size="large" data-count="none" data-url="https://topheman.github.io/react-es6/">Tweet</a>
 */
export default class TwitterButton extends React.Component {
  render() {
    return (
      <iframe
        width="78px"
        height="28px"
        title="Twitter Tweet Button"
        style={{border: 0, overflow: 'hidden'}}
        scrolling="no"
        ref="iframe" src="https://platform.twitter.com/widgets/tweet_button.html?count=none&dnt=false&lang=en&original_referer=http%3A%2F%2Ftopheman.github.io%2Fd3-react-rxjs-experiments&size=l&text=%23react%20%23d3%20%23RxJS%20&type=share&url=https%3A%2F%2Ftopheman.github.io%2Fd3-react-rxjs-experiments%2F&via=topheman" />
    );
  }
}

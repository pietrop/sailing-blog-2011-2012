import React, { useState } from 'react';
import VizSensor from 'react-visibility-sensor';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import posts from './data.json';
import Polaroid from './Polaroid.js';
import './blockquote.css';
import './message-bubble.css';
import './App.css';
import 'bootstrap-css-only';
import ClipboardJS from 'clipboard';

const makeSpeechBubbles = (html) => {
  if (!html) {
    return html;
  }
  const result = html
    .split('</p>')
    .filter((el) => {
      return el;
    })
    .map((p) => {
      return `<section class="message\ last">${p}</p></section>`;
    })
    .join(' ');

  return `<section class="yours\ messages">${result}</section>`;
};

function App() {
  // Declare a new state variable, which we'll call "count"
  const [currentData, setCurrentData] = useState(posts[0]);
  const [currentId, setCurrentId] = useState(posts[0].id);

  const clipboard = new ClipboardJS('.clipboardBtn');

  clipboard.on('success', function () {
    // document.body.insertAdjacentHTML('beforeend', '<div>that worked.</div>');
  });
  clipboard.on('error', function () {
    // document.body.insertAdjacentHTML('beforeend', "<div>that didn't work.</div>");
  });

  return (
    <>
      <Container className="main-container">
        <br />
        <h1 style={{ textAlign: 'center' }}>
          Sailing blog ⛵ 🎬 <small style={{ color: 'grey' }}>2011 - 2012</small>
        </h1>
        <p style={{ textAlign: 'center' }}>
          In 2011 I decided to take a few months off to learn to sail, this is a blog of that experience. <br />
          Everything was done on my 📱
          <br /> Initially I had used tumblr, but recently I exported the data, and gave it a new home, to play around with a new story format.
        </p>
        {/* <h2 style={{ textAlign: 'center', color: 'grey' }}>
        <small>2011 - 2012</small>
      </h2> */}
        {/* TODO: could add some filters */}
        {/* <h2 style={{ textAlign: 'center' }}>📷📹🎧📜 📄</h2> */}
        {/* <h2 style={{ textAlign: 'center' }}>
        {' '}
        {
          new Set(
            posts.map((post) => {
              return post.type + ' ';
            })
          )
        }
      </h2> */}

        <Row>
          <Col xs={{ span: 12, order: 2 }} sm={{ span: 6, order: 1 }} md={6} lg={6} xl={6}>
            <section className={'posts-column'}>
              {posts.map((post, index) => (
                <VizSensor
                  onChange={(isVisible) => {
                    console.log('isVisible', isVisible);
                    if (isVisible) {
                      setCurrentId(post.id);
                      setCurrentData(post);
                    }
                  }}
                >
                  <div
                    id={'id_' + post.id}
                    style={{ minHeight: '60vh', borderBottom: '0.05em solid lightgrey', marginBottom: '1em', marginTop: '1em' }}
                  >
                    {post['type'] === 'Photo' && <span>📷</span>}
                    {post['type'] === 'Video' && <span>📹</span>}
                    {post['type'] === 'Audio' && <span>🎧</span>}
                    {post['type'] === 'Quote' && <span>📜</span>}
                    {post['type'] === 'Conversation' && <span>🗣️</span>} {/* 🎤 */}
                    {post['type'] === 'Link' && <span>🔗</span>}
                    {post['type'] === 'Regular' && <span>📄</span>}
                    <small>{post.date + '  '}</small>
                    <span class="clipboardBtn" data-clipboard-text={`${window.location.origin}#id_${post.id}`} style={{ cursor: 'pointer' }}>
                      📋
                    </span>
                    {/* <a href={`#${post.id}`}>HTML link code generator</a> */}
                    {post.type === 'Photo' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['photo-caption']) }}></div>}
                    {post.type === 'Video' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['video-caption']) }}></div>}
                    {post.type === 'Audio' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['audio-caption']) }}></div>}
                    {post.type === 'Quote' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['quote-source']) }}></div>}
                    {post.type === 'Link' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['link-description']) }}></div>}
                    {post.type === 'Conversation' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['conversation-title']) }}></div>}
                    {post.type === 'Regular' && <div dangerouslySetInnerHTML={{ __html: makeSpeechBubbles(post['regular-title']) }}></div>}
                    {/* TODO */}
                  </div>
                </VizSensor>
              ))}
            </section>
          </Col>

          <Col xs={{ span: 12, order: 1 }} sm={{ span: 6, order: 2 }} md={6} lg={6} xl={6}>
            <section
              className={['polaroid-column'].join(' ')}
              // style={{
              //   position: '-webkit-sticky',
              //   position: 'sticky',
              //   top: 0,
              // }}
            >
              {/* {JSON.stringify(currentData)} */}
              {/* <p>{data['photo-caption']}</p> */}
              {/* <div dangerouslySetInnerHTML={{ __html: data['photo-caption'] }}></div> */}

              {currentData.type === 'Photo' && !currentData.photoset ? (
                <Polaroid caption={currentData.date}>
                  <img style={{ width: '100%', height: 'auto' }} key={currentData['photo-url'][2]['$t']} src={currentData['photo-url'][0]['$t']} />
                </Polaroid>
              ) : null}

              {currentData.type === 'Photo' && currentData.photoset ? (
                <Polaroid caption={currentData.date}>
                  <Carousel>
                    {currentData.photoset.photo.map((photo) => {
                      return (
                        <Carousel.Item>
                          <img
                            // style={{ width: '100%', height: 'auto' }}
                            className="d-block w-100"
                            src={photo['photo-url'][1]['$t']}
                            // alt="First slide"
                          />
                          {/* <Carousel.Caption> */}
                          {/* <h3>First slide label</h3> */}
                          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                          {/* </Carousel.Caption> */}
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                  ``
                </Polaroid>
              ) : null}

              {currentData.type === 'Video' && (
                <>
                  <Polaroid caption={currentData.date}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentData['video-player'][0]
                          .replace(/<video/, '<video controls style="background-color:black;"')
                          .replace(/width='400'/, 'width="100%"')
                          .replace(/height='225'/, "height='auto'")
                          .replace(/muted/, ''),
                      }}
                    ></div>
                  </Polaroid>
                </>
              )}

              {currentData.type === 'Audio' && (
                <Polaroid caption={currentData.date}>
                  {/* Change to use audio element */}
                  {/* <audio controls src={currentData['audio-player'].split('src="')[1].split('.mp3"')[0] + '.mp3'} /> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentData['audio-player'].replace(/width=\"540\"/, 'width="%100"'),
                    }}
                  ></div>
                </Polaroid>
              )}

              {currentData.type === 'Link' && (
                <Polaroid caption={currentData.date}>
                  🔗{' '}
                  <a style={{ textDecoration: 'none' }} href={currentData['link-url']} target="_blank" rel="noopener" rel="noreferrer">
                    {currentData['link-text']}
                  </a>
                </Polaroid>
              )}

              {currentData.type === 'Quote' && (
                <Polaroid caption={currentData.date}>
                  <blockquote cite="https://www.huxley.net/bnw/four.html">
                    <p>
                      {currentData['quote-text']
                        .replace(/&ldquo;/g, '"')
                        .replace(/&rsquo;/g, "'")
                        .replace(/&rdquo;/g, '"')
                        .replace(/&hellip;/g, '...')}
                    </p>
                    {/* <footer>
                    {currentData['quote-source']
                      .replace(/&ldquo;/g, '"')
                      .replace(/&rdquo;/g, '"')
                      .replace(/&hellip;/g, '...')}
                  </footer> */}
                  </blockquote>
                </Polaroid>
              )}

              {currentData.type === 'Conversation' && (
                <Polaroid caption={currentData.date}>
                  {/* {currentData['conversation-text']} */}

                  {currentData.conversation.line.map((line) => {
                    return (
                      <p>
                        <strong>{line.label}</strong> {line['$t']}
                      </p>
                    );
                  })}
                </Polaroid>
              )}

              {currentData.type === 'Regular' && (
                <Polaroid caption={currentData.date}>
                  <div
                    style={{ textAlign: 'left', margin: '1.5em' }}
                    dangerouslySetInnerHTML={{
                      __html: currentData['regular-body'],
                    }}
                  ></div>
                </Polaroid>
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

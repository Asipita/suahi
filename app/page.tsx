import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Heart,
  Sparkles,
  MessageCircle,
  PenLine,
  MoveUpRight,
  Copy,
  RefreshCw,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const prompts = {
  parent: [
    'What were you like before you became my parent?',
    'What is a small moment from your childhood that you still remember?',
    'What did you dream your life would look like when you were young?',
  ],
  grandparent: [
    'What did an ordinary Sunday look like when you were growing up?',
    'Who taught you something you have carried with you all your life?',
    'What family tradition would you love us to keep alive?',
  ],
  loved: [
    'What is a memory you wish you could step back into?',
    'Who made you feel at home when you needed it most?',
    'What is a story about you that more people should know?',
  ],
};
type Person = keyof typeof prompts;

function FirstQuestion() {
  const [person, setPerson] = useState<Person>('parent');
  const [index, setIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const question = prompts[person][index];
  async function copyQuestion() {
    try {
      await navigator.clipboard.writeText(question);
      setCopyStatus('Question copied. Bring it to your next conversation.');
    } catch {
      setCopyStatus(
        'Select the question above to copy it, or write it down for your conversation.',
      );
    }
  }
  return (
    <section
      className="begin-section wrap"
      id="begin"
      aria-labelledby="begin-title"
    >
      <div className="begin-intro">
        <p className="eyebrow">EVERY STORY STARTS SOMEWHERE</p>
        <h2 id="begin-title">
          Start small.
          <br />
          <em>Ask something real.</em>
        </h2>
        <p>
          You don’t need the perfect words. Just a little curiosity, a quiet
          moment, and someone you love.
        </p>
        <span className="handwritten">
          One question can open a whole chapter.
        </span>
      </div>
      <div className="prompt-card">
        <Tabs
          value={person}
          onValueChange={(value) => {
            setPerson(value as Person);
            setIndex(0);
            setCopyStatus('');
          }}
        >
          <p className="prompt-label">WHO ARE YOU THINKING OF?</p>
          <TabsList className="person-tabs" aria-label="Choose a loved one">
            <TabsTrigger value="parent">A parent</TabsTrigger>
            <TabsTrigger value="grandparent">A grandparent</TabsTrigger>
            <TabsTrigger value="loved">Someone special</TabsTrigger>
          </TabsList>
          {(Object.keys(prompts) as Person[]).map((key) => (
            <TabsContent value={key} key={key}>
              <span className="question-number">
                A LITTLE CONVERSATION STARTER · 0{index + 1}
              </span>
              <blockquote className="prompt-question">
                “{prompts[key][index]}”
              </blockquote>
            </TabsContent>
          ))}
        </Tabs>
        <div className="prompt-actions">
          <button className="button" onClick={copyQuestion}>
            {copyStatus.startsWith('Question copied') ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}{' '}
            Copy question
          </button>
          <button
            className="text-link"
            onClick={() => {
              setIndex((index + 1) % 3);
              setCopyStatus('');
            }}
          >
            <RefreshCw size={15} /> Try another
          </button>
        </div>
        <output className="copy-status">
          {copyStatus || 'Take this question into your next conversation.'}
        </output>
      </div>
    </section>
  );
}

function SampleStory() {
  return (
    <Dialog>
      <DialogTrigger className="story-read">
        Read this story <ArrowUpRight size={17} />
      </DialogTrigger>
      <DialogContent className="story-dialog">
        <p className="eyebrow">AN ILLUSTRATIVE FAMILY STORY</p>
        <DialogTitle className="story-dialog-title">
          The woman before Mum
        </DialogTitle>
        <DialogDescription>
          A fictional example of how one conversation can become a keepsake.
        </DialogDescription>
        <div className="story-prose">
          <p>
            I had always known her as Mum. The person who remembered everyone’s
            birthdays, who could tell from my voice when something was wrong,
            who never sat down until everyone had eaten.
          </p>
          <p>
            Then, one afternoon, I asked what she had wanted to be when she was
            young.
          </p>
          <p>
            “A dancer,” she said. And she laughed as though she had just
            remembered a friend she hadn’t seen in years.
          </p>
          <p>
            She told me about the radio in her father’s sitting room. About
            practising when she thought nobody was watching. About the neighbour
            who said she should be on a stage.
          </p>
          <p>
            I didn’t discover a different mother that day. I discovered more of
            the woman she had always been.
          </p>
          <p>Now, when her favourite song comes on, I ask her to dance.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="/" aria-label="Suahi home">
          <BookOpen aria-hidden="true" strokeWidth={1.3} />
          suahi
        </a>
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#a-story">A story to remember</a>
          <a href="#why-suahi">Why Suahi</a>
        </nav>
        <a className="button button-small" href="#begin">
          Begin a story <ArrowUpRight size={16} />
        </a>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-star">✳</span> FOR THE PEOPLE WHO MADE YOU,
              YOU
            </p>
            <h1 id="hero-title">
              Their stories.
              <br />
              Your greatest
              <br />
              <em>inheritance.</em>
            </h1>
            <p className="hero-description">
              Before they were your parents, they were people with dreams,
              adventures, and a whole world of stories. Let’s make sure those
              stories live on.
            </p>
            <div className="hero-actions">
              <a className="button" href="#begin">
                Start with a memory <ArrowRight size={17} />
              </a>
              <a className="text-link" href="#how-it-works">
                See how it works <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="hero-note">
              <Heart size={14} /> A little time today. A gift for generations.
            </p>
          </div>
          <div className="memory-scene">
            <div className="photo-note">
              There’s so much more
              <br />
              to their story.
            </div>
            <figure className="memory-photo">
              <img
                src="/images/family-memory.jpg"
                alt="An archival-style portrait of a mother and daughter sharing a happy moment outside their home"
                width="1000"
                height="1000"
                fetchPriority="high"
              />
              <figcaption>
                Mum, before she was Mum.<span>♡</span>
              </figcaption>
            </figure>
            <div className="memory-label">
              <span className="label-icon">
                <BookOpen size={19} strokeWidth={1.4} />
              </span>
              <span>
                A life worth remembering.<small>One story at a time.</small>
              </span>
            </div>
            <span className="photo-index">
              THE EVERYDAY MOMENTS. THE EXTRAORDINARY LIVES.
            </span>
          </div>
        </section>
        <section className="belief-strip" id="why-suahi">
          <Sparkles size={20} strokeWidth={1.3} />
          <p>
            Because the most important stories
            <br className="mobile-break" /> aren’t in history books.{' '}
            <em>They’re in your family.</em>
          </p>
          <Sparkles size={20} strokeWidth={1.3} />
        </section>
        <section
          className="how-section wrap"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LIFE, ONE MEMORY AT A TIME</p>
              <h2 id="how-title">
                You don’t have to be a writer.
                <br />
                <em>Just someone who cares.</em>
              </h2>
            </div>
            <p>
              The big milestones. The little habits. The recipe they never wrote
              down. It all belongs in their story.
            </p>
          </div>
          <div className="steps">
            <article>
              <div className="step-top">
                <MessageCircle strokeWidth={1.25} />
                <span>01</span>
              </div>
              <h3>Open a conversation</h3>
              <p>
                Start with a thoughtful question. Follow the laughter, the
                pauses, and the memories that come back.
              </p>
            </article>
            <article>
              <div className="step-top">
                <PenLine strokeWidth={1.25} />
                <span>02</span>
              </div>
              <h3>Put their life into words</h3>
              <p>
                Write it as they tell it, or as you remember it. Their favourite
                sayings and little details are what make it theirs.
              </p>
            </article>
            <article>
              <div className="step-top">
                <BookOpen strokeWidth={1.25} />
                <span>03</span>
              </div>
              <h3>Give the story a future</h3>
              <p>
                Bring those memories together into something your family can
                return to, and pass along.
              </p>
            </article>
          </div>
        </section>
        <section
          className="story-section"
          id="a-story"
          aria-labelledby="story-title"
        >
          <div className="wrap story-inner">
            <div className="story-intro">
              <p className="eyebrow">BEHIND EVERY “MUM” IS A WHOLE LIFE</p>
              <h2 id="story-title">
                Meet the person
                <br />
                behind the name.
              </h2>
              <SampleStory />
            </div>
            <div className="story-quote">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                I asked her what she wanted to be when she was young. She said a
                dancer. I’d known her my whole life. I’d never known that.
              </blockquote>
              <div className="quote-credit">
                <span className="credit-line" /> FROM “THE WOMAN BEFORE MUM”
                <small>An illustrative family story</small>
              </div>
            </div>
          </div>
        </section>
        <FirstQuestion />
        <footer className="site-footer wrap">
          <a className="wordmark" href="/" aria-label="Suahi home">
            <BookOpen aria-hidden="true" strokeWidth={1.3} />
            suahi
          </a>
          <p>For the stories that make us.</p>
          <span>© {new Date().getFullYear()} Suahi</span>
          <a className="back-top" href="#main" aria-label="Back to top">
            <MoveUpRight size={19} />
          </a>
        </footer>
      </main>
    </>
  );
}

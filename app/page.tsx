import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  RefreshCw,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const prompts = {
  parent: [
    'What were you like at twenty?',
    'Which ordinary day from childhood do you still remember?',
    'What did you dream your life would become?',
  ],
  grandparent: [
    'What did home feel like when you were young?',
    'Who taught you something you still carry?',
    'Which family tradition should we never lose?',
  ],
  loved: [
    'Which memory would you live again?',
    'Who made you feel most at home?',
    'What story about you should everyone know?',
  ],
};

type Person = keyof typeof prompts;

function PromptStudio() {
  const [person, setPerson] = useState<Person>('parent');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const question = prompts[person][index];

  async function copyQuestion() {
    try {
      await navigator.clipboard.writeText(question);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function nextQuestion() {
    setIndex((current) => (current + 1) % prompts[person].length);
    setCopied(false);
  }

  return (
    <section
      className="prompt-section"
      id="start"
      aria-labelledby="prompt-title"
    >
      <div className="shell prompt-layout">
        <div className="prompt-heading">
          <p className="kicker kicker-light">BEGIN WITH ONE QUESTION</p>
          <h2 id="prompt-title">Start the conversation.</h2>
          <p>Choose someone. We’ll give you a place to begin.</p>
        </div>

        <div className="prompt-panel">
          <Tabs
            value={person}
            onValueChange={(value) => {
              setPerson(value as Person);
              setIndex(0);
              setCopied(false);
            }}
          >
            <TabsList
              className="person-tabs"
              aria-label="Choose a family member"
            >
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="grandparent">Grandparent</TabsTrigger>
              <TabsTrigger value="loved">Loved one</TabsTrigger>
            </TabsList>

            {(Object.keys(prompts) as Person[]).map((key) => (
              <TabsContent value={key} key={key}>
                <p className="prompt-count">QUESTION 0{index + 1}</p>
                <blockquote>“{prompts[key][index]}”</blockquote>
              </TabsContent>
            ))}
          </Tabs>

          <div className="prompt-controls">
            <button className="button button-light" onClick={copyQuestion}>
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? 'Copied' : 'Copy question'}
            </button>
            <button className="quiet-button" onClick={nextQuestion}>
              <RefreshCw size={16} /> Another question
            </button>
          </div>
          <output className="copy-status" aria-live="polite">
            {copied ? 'Ready for your next conversation.' : ''}
          </output>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header shell">
        <a className="wordmark" href="/" aria-label="Suahi home">
          <BookOpen aria-hidden="true" strokeWidth={1.5} />
          <span>suahi</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#start">Try a prompt</a>
        </nav>
        <a className="header-cta" href="#start">
          Start a story <ArrowRight size={17} />
        </a>
      </header>

      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">FAMILY STORIES, KEPT CLOSE</p>
            <h1 id="hero-title">
              Every life deserves to be <em>remembered.</em>
            </h1>
            <p className="hero-description">
              Capture the voice, memories, and everyday moments of someone you
              love.
            </p>
            <div className="hero-actions">
              <a className="button" href="#start">
                Begin a story <ArrowRight size={18} />
              </a>
              <a className="secondary-link" href="#how">
                See how it works <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <figure className="hero-visual">
            <img
              src="/images/family-memory.jpg"
              alt="A mother and daughter sharing a quiet moment outside their home"
              width="1000"
              height="1000"
              fetchPriority="high"
            />
            <figcaption>
              <span className="caption-label">A GOOD PLACE TO START</span>
              <span>“What were you like before I knew you?”</span>
            </figcaption>
          </figure>
        </section>

        <section className="principle" aria-label="Our purpose">
          <div className="shell principle-inner">
            <p>Not a family tree.</p>
            <p>Not a list of dates.</p>
            <p className="principle-emphasis">A life, in their own words.</p>
          </div>
        </section>

        <section
          className="how-section shell"
          id="how"
          aria-labelledby="how-title"
        >
          <div className="how-heading">
            <p className="kicker">HOW SUAHI WORKS</p>
            <h2 id="how-title">One memory at a time.</h2>
          </div>
          <div className="steps">
            <article>
              <span>01</span>
              <h3>Ask</h3>
              <p>Use thoughtful prompts to open a real conversation.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Write</h3>
              <p>Shape their memories into clear, personal stories.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep</h3>
              <p>Create something your family can return to for years.</p>
            </article>
          </div>
        </section>

        <PromptStudio />
      </main>

      <footer className="site-footer shell">
        <a className="wordmark" href="/" aria-label="Suahi home">
          <BookOpen aria-hidden="true" strokeWidth={1.5} />
          <span>suahi</span>
        </a>
        <p>Keep the stories that made you.</p>
        <span>© {new Date().getFullYear()} Suahi</span>
      </footer>
    </>
  );
}

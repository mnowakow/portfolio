import { Section, Body, CodeBlock, ProjectHeader, type FactGroup } from "./ProjectPage";

// --- page data -------------------------------------------------------

const TAGS = ["Audio Programming", "C++", "JUCE", "Dart FFI", "Flutter", "Work in Progress"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Developer"] },
  { label: "Stack", items: ["JUCE (C++)", "Dart FFI", "Flutter", "CMake"] },
];

// --- page ----------------------------------------------------------

export default function JuceDartFfiProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="JUCE, over FFI, into Flutter"
        lead="A cross-platform audio engine bridged into Flutter through Dart's
          FFI, built as the foundation for a very different next step, an app
          that reads a live video image as if it were a score."
        factGroups={FACT_GROUPS}
      />

      {/* <ImagePlaceholder caption="Screenshot: the current Flutter test app, a tone generator over the JUCE engine" /> */}

      <Section id="goal" title="Introduction and goal">
        <Body>
          Flutter has no serious real time audio story of its own, and JUCE is the C++ framework most audio developers already reach for, so the plan was to keep JUCE doing what it is good at and let
          Flutter only own the UI. That means a C engine and a Dart UI have to talk to each other directly, in both directions, with no server or IPC in between.
        </Body>
      </Section>

      <Section id="how" title="How it is built">
        <Body>
          JUCE's <code>AudioProcessor</code> sits behind a small C compatible interface, create and destroy a processor, initialize it with a sample rate and buffer size, start and stop it, and
          process a block of samples. That interface is what Dart's FFI can actually call, C++ objects and templates are not visible across the boundary, only C-shaped functions and pointers are.
        </Body>
        <CodeBlock>{`AudioProcessor* create_audio_processor();
int  initialize_audio(AudioProcessor*, int sample_rate, int buffer_size);
void process_audio_block(AudioProcessor*, float* in, float* out, int n);
void set_gain(AudioProcessor*, float gain);`}</CodeBlock>
        <Body>
          On the Dart side those signatures get mirrored one to one and loaded from the compiled dynamic library, <code>.dylib</code> on macOS, <code>.so</code> on Linux, <code>.dll</code> on Windows.
          Android does not go through JUCE at all, it talks to OpenSL ES directly over JNI instead, since that turned out to be the more direct path on that platform. Right now the Flutter app on top
          of all this is deliberately plain, a sine tone with a frequency and gain slider, enough to prove the round trip from a UI gesture in Dart down to a JUCE audio callback and back actually
          works end to end.
        </Body>
      </Section>

      <Section id="outcome" title="Where this is going">
        <Body>
          The tone generator is scaffolding, not the point. The actual idea is a Flutter app that turns a live video feed into sound by reading the image the way you would read a score, left to right,
          treating position across the frame as time and whatever sits at each position as the thing to sonify. JUCE is what will end up doing that sonification in real time once the image side of the
          pipeline exists, which is why getting a clean, low latency Dart to JUCE bridge working first, rather than starting with the vision part, felt like the right order to build this in.
        </Body>
      </Section>
    </article>
  );
}

import { Section, Body, CodeBlock, ImagePlaceholder, ProjectHeader, type FactGroup, type ProjectLink } from "./ProjectPage";

// --- page data -------------------------------------------------------

const TAGS = ["Audio Programming", "Sonification", "Flutter", "C++", "Dart FFI", "Work in Progress"];

const FACT_GROUPS: FactGroup[] = [
  { label: "Role", items: ["Developer"] },
  { label: "Stack", items: ["Flutter", "Dart FFI", "C++17", "OpenSL ES", "Core Audio"] },
  { label: "Platforms", items: ["Android", "iOS"] },
];

const LINKS: ProjectLink[] = [{ href: "#juce-dart-ffi", label: "The audio bridge prototype it grew out of" }];

// --- page ----------------------------------------------------------

export default function PianoramaProject() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <ProjectHeader
        tags={TAGS}
        title="Pianorama"
        lead="Turning landscapes into sound. A mobile app that reads the colors
          in front of the phone camera like the holes in a pianola roll, and
          plays them live on a synthesizer written from scratch in C++."
        factGroups={FACT_GROUPS}
        links={LINKS}
      />

      <ImagePlaceholder caption="Screenshot: the live page, camera image with the reading strip and the instrument bar" />

      <Section id="goal" title="Introduction and goal">
        <Body>
          Pianorama goes back to <em>Ridiola</em>, a MaxMSP prototype from the 2018 summer semester that played a video as if it were a score. It had four hard wired instruments and only worked
          on a laptop with a prepared video file. The idea held up well enough that I wanted it in a pocket, pointed at whatever is outside the window of a train, so Pianorama uses the live camera
          instead, and the four fixed instruments became up to eight that can be added, tuned and muted while it is playing.
        </Body>
        <Body>
          The core idea fits in one sentence. One vertical column of the image is split into 88 cells, one per piano key, and every instrument listens for one color. When its color shows up in a
          cell, a note sounds, and the higher up in the image, the higher the pitch.
        </Body>
      </Section>

      <Section id="music" title="From color to note">
        <Body>
          Pianorama reacts to change, not to a clock. A cell that takes on an instrument's color strikes a note, a color that stays holds it, a color that shifts noticeably while still matching
          strikes it again, and a color that disappears lets the note fade out. "Matching" means every RGB channel is within a tolerance of the target, and a note that is already sounding gets a
          little extra tolerance so that camera noise does not make it flicker. The saturation of the color sets the velocity, so vivid colors play loud and grays play quietly.
        </Body>
        <Body>
          Each instrument maps a range of the image onto a range of notes, bottom to low and top to high, and snaps the result to a scale. The default is pentatonic, because a big patch of sky
          then still sounds like music rather than a cluster, and a limit on simultaneous notes per instrument keeps large single colored areas from turning into mush. A slow pad listening for
          light blue in the upper half and a plucked sound listening for green in the lower part already make a moving landscape sound surprisingly composed.
        </Body>
        <ImagePlaceholder caption="Screenshot: an instrument page with color, sound, envelope and range screens" />
        <Body>
          The interface works like a small mixing desk. Swiping sideways moves between the live view, the image adjustments and one page per instrument, each with screens for its color (with an
          eyedropper that picks straight from the image), its timbre, its ADSR envelope and its image and note range. Mute and solo sit in the top bar, so instruments can be brought in and out
          while playing. Brightness, contrast and saturation are applied as one formula to both the preview and the sampled cells, so what you see is exactly what gets played. Besides the camera,
          a recorded video can be loaded as the input too, which is closer to how Ridiola worked.
        </Body>
      </Section>

      <Section id="how" title="How it is built">
        <Body>
          The Flutter side samples the camera frames, about every 40 ms, averaging a few pixels per cell around the reading column straight from the YUV or BGRA planes. A controller then decides
          per instrument which notes start, stay or stop, and sends only those events down to a native engine. Notes have to start without delay and decay cleanly over long envelopes, which is not
          something Dart can do on its own, so all sound generation happens in C++ on a real time audio thread.
        </Body>
        <CodeBlock>{`int  re_start();
void re_note_on(int inst, int timbre, int note, float vel, float pan,
                float a, float d, float s, float r);
void re_note_off(int inst, int note);
void re_set_reverb(float amount);`}</CodeBlock>
        <Body>
          That engine is the direct successor of the <a href="#juce-dart-ffi" className="text-gray-300 underline">JUCE, over FFI, into Flutter</a> prototype, but without JUCE. Dart calls a
          small C API through <code>dart:ffi</code>, and those calls only push events onto a lock free single producer, single consumer queue that the audio callback drains at the start of
          every block. Nothing is allocated in the callback, and volume and reverb are atomics smoothed per block. The engine runs 64 voices with voice stealing and ten timbres, from PolyBLEP saws
          and squares over FM e-piano and bell sounds to a Karplus-Strong pluck, followed by a Freeverb style reverb and a soft limiter. Output goes through OpenSL ES on Android and a RemoteIO
          audio unit on iOS, and the DSP is always compiled optimized, even in debug builds.
        </Body>
      </Section>

      <Section id="outcome" title="Where this is going">
        <Body>
          Pianorama runs on Android and iOS phones today, with tests for the trigger logic, the color math, the scales and the layout on three phone sizes. It is still a side project with rough
          edges. It only works in landscape, settings are not saved between sessions yet, scales are always rooted on C and the interface is German only. Next up are persistent instrument
          setups and lower latency on Android, so the app can go from an experiment I carry around to something other people can play with.
        </Body>
      </Section>
    </article>
  );
}

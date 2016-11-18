package com.example;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sound.midi.*;

@SpringBootApplication
public class DemoApplicationTests {

	public static void main(String[] args) throws Exception {
		//SpringApplication.run(BootZhiBoApplicationTest.class, args);

		DemoApplicationTests demo = new DemoApplicationTests();
		if (args.length<2) {
			System.out.println(111222);
		}else {
			int instrument = Integer.parseInt(args[0]);
			int note = Integer.parseInt(args[1]);
			demo.play(instrument,note);
		}

	}

	public void play (int instrument ,int note) {
		try {

			Sequencer player = MidiSystem.getSequencer();
			player.open();
			Sequence sequence = new Sequence(Sequence.PPQ,4);
			Track track = sequence.createTrack();

			MidiEvent event = null;

			ShortMessage first = new ShortMessage();
			first.setMessage(192,1,instrument,0);
			MidiEvent change = new MidiEvent(first,1);
			track.add(change);

			ShortMessage a = new ShortMessage();
			a.setMessage(144,1,note,0);
			MidiEvent noteOn = new MidiEvent(a,1);
			track.add(noteOn);

			ShortMessage b = new ShortMessage();
			b.setMessage(128,1,note,100);
			MidiEvent noteOff = new MidiEvent(b,100);
			track.add(noteOff);

			player.setSequence(sequence);
			player.start();

		}catch (Exception e){
			e.printStackTrace();
		}
	}

}

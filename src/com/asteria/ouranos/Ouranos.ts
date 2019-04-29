import { OuranosSession } from './lang/OuranosSession';
import { AsteriaSession } from '../gaia/lang/AsteriaSession';

/**
 * The <code>Ouranos</code> static class represents the entry point for creating as Asteria application.
 */
export class Ouranos {

    public static buildSession(name: string): AsteriaSession {
        const session: AsteriaSession = new OuranosSession(name);
        return session;
    }
}
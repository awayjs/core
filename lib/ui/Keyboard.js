"use strict";
var Keyboard = (function () {
    function Keyboard() {
    }
    /**
     * Constant associated with the key code value for the A key (65).
     */
    Keyboard.A = 65;
    /**
     * Constant associated with the key code value for the Alternate (Option) key  (18).
     */
    Keyboard.ALTERNATE = 18;
    /**
     * Select the audio mode
     */
    Keyboard.AUDIO = 0x01000017;
    /**
     * Constant associated with the key code value for the B key (66).
     */
    Keyboard.B = 66;
    /**
     * Return to previous page in application
     */
    Keyboard.BACK = 0x01000016;
    /**
     * Constant associated with the key code value for the ` key (192).
     */
    Keyboard.BACKQUOTE = 192;
    /**
     * Constant associated with the key code value for the \ key (220).
     */
    Keyboard.BACKSLASH = 220;
    /**
     * Constant associated with the key code value for the Backspace key (8).
     */
    Keyboard.BACKSPACE = 8;
    /**
     * Blue function key button
     */
    Keyboard.BLUE = 0x01000003;
    /**
     * Constant associated with the key code value for the C key (67).
     */
    Keyboard.C = 67;
    /**
     * Constant associated with the key code value for the Caps Lock key (20).
     */
    Keyboard.CAPS_LOCK = 20;
    /**
     * Channel down
     */
    Keyboard.CHANNEL_DOWN = 0x01000005;
    /**
     * Channel up
     */
    Keyboard.CHANNEL_UP = 0x01000005;
    /**
     * Constant associated with the key code value for the , key (188).
     */
    Keyboard.COMMA = 188;
    /**
     * Constant associated with the Mac command key (15). This constant is
     * currently only used for setting menu key equivalents.
     */
    Keyboard.COMMAND = 15;
    /**
     * Constant associated with the key code value for the Control key (17).
     */
    Keyboard.CONTROL = 17;
    /**
     * Constant associated with the key code value for the D key (68).
     */
    Keyboard.D = 68;
    /**
     * Constant associated with the key code value for the Delete key (46).
     */
    Keyboard.DELETE = 46;
    /**
     * Constant associated with the key code value for the Down Arrow key (40).
     */
    Keyboard.DOWN = 40;
    /**
     * Engage DVR application mode
     */
    Keyboard.DVR = 0x01000019;
    /**
     * Constant associated with the key code value for the E key (69).
     */
    Keyboard.E = 69;
    /**
     * Constant associated with the key code value for the End key (35).
     */
    Keyboard.END = 35;
    /**
     * Constant associated with the key code value for the Enter key (13).
     */
    Keyboard.ENTER = 13;
    /**
     * Constant associated with the key code value for the = key (187).
     */
    Keyboard.EQUAL = 187;
    /**
     * Constant associated with the key code value for the Escape key (27).
     */
    Keyboard.ESCAPE = 27;
    /**
     * Exits current application mode
     */
    Keyboard.EXIT = 0x01000015;
    /**
     * Constant associated with the key code value for the F key (70).
     */
    Keyboard.F = 70;
    /**
     * Constant associated with the key code value for the F1 key (112).
     */
    Keyboard.F1 = 112;
    /**
     * Constant associated with the key code value for the F10 key (121).
     */
    Keyboard.F10 = 121;
    /**
     * Constant associated with the key code value for the F11 key (122).
     */
    Keyboard.F11 = 122;
    /**
     * Constant associated with the key code value for the F12 key (123).
     */
    Keyboard.F12 = 123;
    /**
     * Constant associated with the key code value for the F13 key (124).
     */
    Keyboard.F13 = 124;
    /**
     * Constant associated with the key code value for the F14 key (125).
     */
    Keyboard.F14 = 125;
    /**
     * Constant associated with the key code value for the F15 key (126).
     */
    Keyboard.F15 = 126;
    /**
     * Constant associated with the key code value for the F2 key (113).
     */
    Keyboard.F2 = 113;
    /**
     * Constant associated with the key code value for the F3 key (114).
     */
    Keyboard.F3 = 114;
    /**
     * Constant associated with the key code value for the F4 key (115).
     */
    Keyboard.F4 = 115;
    /**
     * Constant associated with the key code value for the F5 key (116).
     */
    Keyboard.F5 = 116;
    /**
     * Constant associated with the key code value for the F6 key (117).
     */
    Keyboard.F6 = 117;
    /**
     * Constant associated with the key code value for the F7 key (118).
     */
    Keyboard.F7 = 118;
    /**
     * Constant associated with the key code value for the F8 key (119).
     */
    Keyboard.F8 = 119;
    /**
     * Constant associated with the key code value for the F9 key (120).
     */
    Keyboard.F9 = 120;
    /**
     * Engage fast-forward transport mode
     */
    Keyboard.FAST_FORWARD = 0x0100000A;
    /**
     * Constant associated with the key code value for the G key (71).
     */
    Keyboard.G = 71;
    /**
     * Green function key button
     */
    Keyboard.GREEN = 0x01000001;
    /**
     * Engage program guide
     */
    Keyboard.GUIDE = 0x01000014;
    /**
     * Constant associated with the key code value for the H key (72).
     */
    Keyboard.H = 72;
    /**
     * Engage help application or context-sensitive help
     */
    Keyboard.HELP = 0x0100001D;
    /**
     * Constant associated with the key code value for the Home key (36).
     */
    Keyboard.HOME = 36;
    /**
     * Constant associated with the key code value for the I key (73).
     */
    Keyboard.I = 73;
    /**
     * Info button
     */
    Keyboard.INFO = 0x01000013;
    /**
     * Cycle input
     */
    Keyboard.INPUT = 0x0100001B;
    /**
     * Constant associated with the key code value for the Insert key (45).
     */
    Keyboard.INSERT = 45;
    /**
     * Constant associated with the key code value for the J key (74).
     */
    Keyboard.J = 74;
    /**
     * Constant associated with the key code value for the K key (75).
     */
    Keyboard.K = 75;
    /**
     * The Begin key
     */
    Keyboard.KEYNAME_BEGIN = "Begin";
    /**
     * The Break key
     */
    Keyboard.KEYNAME_BREAK = "Break";
    /**
     * The Clear Display key
     */
    Keyboard.KEYNAME_CLEARDISPLAY = "ClrDsp";
    /**
     * The Clear Line key
     */
    Keyboard.KEYNAME_CLEARLINE = "ClrLn";
    /**
     * The Delete key
     */
    Keyboard.KEYNAME_DELETE = "Delete";
    /**
     * The Delete Character key
     */
    Keyboard.KEYNAME_DELETECHAR = "DelChr";
    /**
     * The Delete Line key
     */
    Keyboard.KEYNAME_DELETELINE = "DelLn";
    /**
     * The down arrow
     */
    Keyboard.KEYNAME_DOWNARROW = "Down";
    /**
     * The End key
     */
    Keyboard.KEYNAME_END = "End";
    /**
     * The Execute key
     */
    Keyboard.KEYNAME_EXECUTE = "Exec";
    /**
     * The F1 key
     */
    Keyboard.KEYNAME_F1 = "F1";
    /**
     * The F10 key
     */
    Keyboard.KEYNAME_F10 = "F10";
    /**
     * The F11 key
     */
    Keyboard.KEYNAME_F11 = "F11";
    /**
     * The F12 key
     */
    Keyboard.KEYNAME_F12 = "F12";
    /**
     * The F13 key
     */
    Keyboard.KEYNAME_F13 = "F13";
    /**
     * The F14 key
     */
    Keyboard.KEYNAME_F14 = "F14";
    /**
     * The F15 key
     */
    Keyboard.KEYNAME_F15 = "F15";
    /**
     * The F16 key
     */
    Keyboard.KEYNAME_F16 = "F16";
    /**
     * The F17 key
     */
    Keyboard.KEYNAME_F17 = "F17";
    /**
     * The F18 key
     */
    Keyboard.KEYNAME_F18 = "F18";
    /**
     * The F19 key
     */
    Keyboard.KEYNAME_F19 = "F19";
    /**
     * The F2 key
     */
    Keyboard.KEYNAME_F2 = "F2";
    /**
     * The F20 key
     */
    Keyboard.KEYNAME_F20 = "F20";
    /**
     * The F21 key
     */
    Keyboard.KEYNAME_F21 = "F21";
    /**
     * The F22 key
     */
    Keyboard.KEYNAME_F22 = "F22";
    /**
     * The F23 key
     */
    Keyboard.KEYNAME_F23 = "F23";
    /**
     * The F24 key
     */
    Keyboard.KEYNAME_F24 = "F24";
    /**
     * The F25 key
     */
    Keyboard.KEYNAME_F25 = "F25";
    /**
     * The F26 key
     */
    Keyboard.KEYNAME_F26 = "F26";
    /**
     * The F27 key
     */
    Keyboard.KEYNAME_F27 = "F27";
    /**
     * The F28 key
     */
    Keyboard.KEYNAME_F28 = "F28";
    /**
     * The F29 key
     */
    Keyboard.KEYNAME_F29 = "F29";
    /**
     * The F3 key
     */
    Keyboard.KEYNAME_F3 = "F3";
    /**
     * The F30 key
     */
    Keyboard.KEYNAME_F30 = "F30";
    /**
     * The F31 key
     */
    Keyboard.KEYNAME_F31 = "F31";
    /**
     * The F32 key
     */
    Keyboard.KEYNAME_F32 = "F32";
    /**
     * The F33 key
     */
    Keyboard.KEYNAME_F33 = "F33";
    /**
     * The F34 key
     */
    Keyboard.KEYNAME_F34 = "F34";
    /**
     * The F35 key
     */
    Keyboard.KEYNAME_F35 = "F35";
    /**
     * The F4 key
     */
    Keyboard.KEYNAME_F4 = "F4";
    /**
     * The F5 key
     */
    Keyboard.KEYNAME_F5 = "F5";
    /**
     * The F6 key
     */
    Keyboard.KEYNAME_F6 = "F6";
    /**
     * The F7 key
     */
    Keyboard.KEYNAME_F7 = "F7";
    /**
     * The F8 key
     */
    Keyboard.KEYNAME_F8 = "F8";
    /**
     * The F9 key
     */
    Keyboard.KEYNAME_F9 = "F9";
    /**
     * The Find key
     */
    Keyboard.KEYNAME_FIND = "Find";
    /**
     * The Help key
     */
    Keyboard.KEYNAME_HELP = "Help";
    /**
     * The Home key
     */
    Keyboard.KEYNAME_HOME = "Home";
    /**
     * The Insert key
     */
    Keyboard.KEYNAME_INSERT = "Insert";
    /**
     * The Insert Character key
     */
    Keyboard.KEYNAME_INSERTCHAR = "InsChr";
    /**
     * The Insert Line key
     */
    Keyboard.KEYNAME_INSERTLINE = "LnsLn";
    /**
     * The left arrow
     */
    Keyboard.KEYNAME_LEFTARROW = "Left";
    /**
     * The Menu key
     */
    Keyboard.KEYNAME_MENU = "Menu";
    /**
     * The Mode Switch key
     */
    Keyboard.KEYNAME_MODESWITCH = "ModeSw";
    /**
     * The Next key
     */
    Keyboard.KEYNAME_NEXT = "Next";
    /**
     * The Page Down key
     */
    Keyboard.KEYNAME_PAGEDOWN = "PgDn";
    /**
     * The Page Up key
     */
    Keyboard.KEYNAME_PAGEUP = "PgUp";
    /**
     * The Pause key
     */
    Keyboard.KEYNAME_PAUSE = "Pause";
    /**
     * The Previous key
     */
    Keyboard.KEYNAME_PREV = "Prev";
    /**
     * The PRINT key
     */
    Keyboard.KEYNAME_PRINT = "Print";
    /**
     * The PRINT Screen
     */
    Keyboard.KEYNAME_PRINTSCREEN = "PrntScrn";
    /**
     * The Redo key
     */
    Keyboard.KEYNAME_REDO = "Redo";
    /**
     * The Reset key
     */
    Keyboard.KEYNAME_RESET = "Reset";
    /**
     * The right arrow
     */
    Keyboard.KEYNAME_RIGHTARROW = "Right";
    /**
     * The Scroll Lock key
     */
    Keyboard.KEYNAME_SCROLLLOCK = "ScrlLck";
    /**
     * The Select key
     */
    Keyboard.KEYNAME_SELECT = "Select";
    /**
     * The Stop key
     */
    Keyboard.KEYNAME_STOP = "Stop";
    /**
     * The System Request key
     */
    Keyboard.KEYNAME_SYSREQ = "SysReq";
    /**
     * The System key
     */
    Keyboard.KEYNAME_SYSTEM = "Sys";
    /**
     * The Undo key
     */
    Keyboard.KEYNAME_UNDO = "Undo";
    /**
     * The up arrow
     */
    Keyboard.KEYNAME_UPARROW = "Up";
    /**
     * The User key
     */
    Keyboard.KEYNAME_USER = "User";
    /**
     * Constant associated with the key code value for the L key (76).
     */
    Keyboard.L = 76;
    /**
     * Watch last channel or show watched
     */
    Keyboard.LAST = 0x01000011;
    /**
     * Constant associated with the key code value for the Left Arrow key (37).
     */
    Keyboard.LEFT = 37;
    /**
     * Constant associated with the key code value for the [ key (219).
     */
    Keyboard.LEFTBRACKET = 219;
    /**
     * Return to live [position in broadcast]
     */
    Keyboard.LIVE = 0x01000010;
    /**
     * Constant associated with the key code value for the M key (77).
     */
    Keyboard.M = 77;
    /**
     * Engage "Master Shell" e.g. TiVo or other vendor button
     */
    Keyboard.MASTER_SHELL = 0x0100001E;
    /**
     * Engage menu
     */
    Keyboard.MENU = 0x01000012;
    /**
     * Constant associated with the key code value for the - key (189).
     */
    Keyboard.MINUS = 189;
    /**
     * Constant associated with the key code value for the N key (78).
     */
    Keyboard.N = 78;
    /**
     * Skip to next track or chapter
     */
    Keyboard.NEXT = 0x0100000E;
    /**
     * Constant associated with the key code value for the 0 key (48).
     */
    Keyboard.NUMBER_0 = 48;
    /**
     * Constant associated with the key code value for the 1 key (49).
     */
    Keyboard.NUMBER_1 = 49;
    /**
     * Constant associated with the key code value for the 2 key (50).
     */
    Keyboard.NUMBER_2 = 50;
    /**
     * Constant associated with the key code value for the 3 key (51).
     */
    Keyboard.NUMBER_3 = 51;
    /**
     * Constant associated with the key code value for the 4 key (52).
     */
    Keyboard.NUMBER_4 = 52;
    /**
     * Constant associated with the key code value for the 5 key (53).
     */
    Keyboard.NUMBER_5 = 53;
    /**
     * Constant associated with the key code value for the 6 key (54).
     */
    Keyboard.NUMBER_6 = 54;
    /**
     * Constant associated with the key code value for the 7 key (55).
     */
    Keyboard.NUMBER_7 = 55;
    /**
     * Constant associated with the key code value for the 8 key (56).
     */
    Keyboard.NUMBER_8 = 56;
    /**
     * Constant associated with the key code value for the 9 key (57).
     */
    Keyboard.NUMBER_9 = 57;
    /**
     * Constant associated with the pseudo-key code for the the number pad (21). Use to set numpad modifier on key equivalents
     */
    Keyboard.NUMPAD = 21;
    /**
     * Constant associated with the key code value for the number 0 key on the number pad (96).
     */
    Keyboard.NUMPAD_0 = 96;
    /**
     * Constant associated with the key code value for the number 1 key on the number pad (97).
     */
    Keyboard.NUMPAD_1 = 97;
    /**
     * Constant associated with the key code value for the number 2 key on the number pad (98).
     */
    Keyboard.NUMPAD_2 = 98;
    /**
     * Constant associated with the key code value for the number 3 key on the number pad (99).
     */
    Keyboard.NUMPAD_3 = 99;
    /**
     * Constant associated with the key code value for the number 4 key on the number pad (100).
     */
    Keyboard.NUMPAD_4 = 100;
    /**
     * Constant associated with the key code value for the number 5 key on the number pad (101).
     */
    Keyboard.NUMPAD_5 = 101;
    /**
     * Constant associated with the key code value for the number 6 key on the number pad (102).
     */
    Keyboard.NUMPAD_6 = 102;
    /**
     * Constant associated with the key code value for the number 7 key on the number pad (103).
     */
    Keyboard.NUMPAD_7 = 103;
    /**
     * Constant associated with the key code value for the number 8 key on the number pad (104).
     */
    Keyboard.NUMPAD_8 = 104;
    /**
     * Constant associated with the key code value for the number 9 key on the number pad (105).
     */
    Keyboard.NUMPAD_9 = 105;
    /**
     * Constant associated with the key code value for the addition key on the number pad (107).
     */
    Keyboard.NUMPAD_ADD = 107;
    /**
     * Constant associated with the key code value for the decimal key on the number pad (110).
     */
    Keyboard.NUMPAD_DECIMAL = 110;
    /**
     * Constant associated with the key code value for the division key on the number pad (111).
     */
    Keyboard.NUMPAD_DIVIDE = 111;
    /**
     * Constant associated with the key code value for the Enter key on the number pad (108).
     */
    Keyboard.NUMPAD_ENTER = 108;
    /**
     * Constant associated with the key code value for the multiplication key on the number pad (106).
     */
    Keyboard.NUMPAD_MULTIPLY = 106;
    /**
     * Constant associated with the key code value for the subtraction key on the number pad (109).
     */
    Keyboard.NUMPAD_SUBTRACT = 109;
    /**
     * Constant associated with the key code value for the O key (79).
     */
    Keyboard.O = 79;
    /**
     * Constant associated with the key code value for the P key (80).
     */
    Keyboard.P = 80;
    /**
     * Constant associated with the key code value for the Page Down key (34).
     */
    Keyboard.PAGE_DOWN = 34;
    /**
     * Constant associated with the key code value for the Page Up key (33).
     */
    Keyboard.PAGE_UP = 33;
    /**
     * Engage pause transport mode
     */
    Keyboard.PAUSE = 0x01000008;
    /**
     * Constant associated with the key code value for the . key (190).
     */
    Keyboard.PERIOD = 190;
    /**
     * Engage play transport mode
     */
    Keyboard.PLAY = 0x01000007;
    /**
     * Skip to previous track or chapter
     */
    Keyboard.PREVIOUS = 0x0100000F;
    /**
     * Constant associated with the key code value for the Q key (81).
     */
    Keyboard.Q = 81;
    /**
     * Constant associated with the key code value for the ' key (222).
     */
    Keyboard.QUOTE = 222;
    /**
     * Constant associated with the key code value for the R key (82).
     */
    Keyboard.R = 82;
    /**
     * Record item or engage record transport mode
     */
    Keyboard.RECORD = 0x01000006;
    /**
     * Red function key button
     */
    Keyboard.RED = 0x01000000;
    /**
     * Engage rewind transport mode
     */
    Keyboard.REWIND = 0x0100000B;
    /**
     * Constant associated with the key code value for the Right Arrow key (39).
     */
    Keyboard.RIGHT = 39;
    /**
     * Constant associated with the key code value for the ] key (221).
     */
    Keyboard.RIGHTBRACKET = 221;
    /**
     * Constant associated with the key code value for the S key (83).
     */
    Keyboard.S = 83;
    /**
     * Search button
     */
    Keyboard.SEARCH = 0x0100001F;
    /**
     * Constant associated with the key code value for the ; key (186).
     */
    Keyboard.SEMICOLON = 186;
    /**
     * Engage setup application or menu
     */
    Keyboard.SETUP = 0x0100001C;
    /**
     * Constant associated with the key code value for the Shift key (16).
     */
    Keyboard.SHIFT = 16;
    /**
     * Quick skip backward (usually 7-10 seconds)
     */
    Keyboard.SKIP_BACKWARD = 0x0100000D;
    /**
     * Quick skip ahead (usually 30 seconds)
     */
    Keyboard.SKIP_FORWARD = 0x0100000C;
    /**
     * Constant associated with the key code value for the / key (191).
     */
    Keyboard.SLASH = 191;
    /**
     * Constant associated with the key code value for the Spacebar (32).
     */
    Keyboard.SPACE = 32;
    /**
     * Engage stop transport mode
     */
    Keyboard.STOP = 0x01000009;
    /**
     * Toggle subtitles
     */
    Keyboard.SUBTITLE = 0x01000018;
    /**
     * Constant associated with the key code value for the T key (84).
     */
    Keyboard.T = 84;
    /**
     * Constant associated with the key code value for the Tab key (9).
     */
    Keyboard.TAB = 9;
    /**
     * Constant associated with the key code value for the U key (85).
     */
    Keyboard.U = 85;
    /**
     * Constant associated with the key code value for the Up Arrow key (38).
     */
    Keyboard.UP = 38;
    /**
     * Constant associated with the key code value for the V key (86).
     */
    Keyboard.V = 86;
    /**
     * Engage video-on-demand
     */
    Keyboard.VOD = 0x0100001A;
    /**
     * Constant associated with the key code value for the W key (87).
     */
    Keyboard.W = 87;
    /**
     * Constant associated with the key code value for the X key (88).
     */
    Keyboard.X = 88;
    /**
     * Constant associated with the key code value for the Y key (89).
     */
    Keyboard.Y = 89;
    /**
     * Yellow function key button
     */
    Keyboard.YELLOW = 0x01000002;
    /**
     * Constant associated with the key code value for the Z key (90).
     */
    Keyboard.Z = 90;
    return Keyboard;
}());
exports.Keyboard = Keyboard;

import { UserDataType } from "@/util/functions/getServerUserData";
import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";
import moment from "moment-timezone";
import { create } from "zustand";

interface WinStateStoreType {
    winState: number|null;
    setWinState: (nowWinState: number) => void;
    loadWinState: () => void;
}

// 초기 winstate 설정
const DEFAULT_WINSTATE = null;

/** 사용자가 정답을 맞혔는지 저장하는 store */
export const useWinStateLocalstorage = create<WinStateStoreType>((set) => ({
    winState: DEFAULT_WINSTATE,
    /** localstorage에 winstate 저장하기 */
    setWinState: (nowWinState) => {
        localStorage.setItem('winstate', (nowWinState).toString());
        set({ winState: nowWinState });
    },
    /** localstorage에서 winstate 로드하기 */
    loadWinState: () => {
        let nowWinState = localStorage.getItem('winstate');
        if(!nowWinState){
            nowWinState = '-1';
            localStorage.setItem('winstate', nowWinState);
        }
        set({ winState: parseInt(nowWinState) });
    },
}));

interface GuessesStoreType {
    guesses: JsonSimilarityType[]|null;
    setGuessesState: (nowWinState: JsonSimilarityType[]) => void;
    loadGuessesState: () => void;
}

// 초기 gusses 설정
const DEFAULT_GUESSES :JsonSimilarityType[]|null = null;

/** 사용자가 추측한 값을 저장하는 store */
export const useGuessesLocalstorage = create<GuessesStoreType>((set) => ({
    guesses: DEFAULT_GUESSES,
    /** localstorage에 추측한 값들이 담긴 어레이 저장하기 */
    setGuessesState: (guessesState) => {
        localStorage.setItem('guesses', JSON.stringify(guessesState));
        set({ guesses: guessesState });
    },
    /** localstorage에서 사용자가 추측한 값들 꺼내오기 */
    loadGuessesState: () => {
        let guessesState = localStorage.getItem('guesses');
        // // localstorage에 값이 등록되지 않았을 경우에
        if(!guessesState){
            guessesState = '[]';
            localStorage.setItem('guesses', guessesState);
        }
        set({ guesses: JSON.parse(guessesState) });
    },
}));

interface TodayDateStoreType {
    today: string|null;
    setTodayDateState: (nowToday: string) => void;
    loadTodayDateState: () => void;
}

const userNowDate = new Date();
const NOW = moment(userNowDate ).tz("Asia/Seoul").format('YYYY-MM-DD');
const DEFAULT_TODAY :string|null = null;

/** 오늘의 날짜를 저장하는 store */
export const useTodayDateLocalstorage = create<TodayDateStoreType>((set) => ({
    today : DEFAULT_TODAY,
    /** 오늘 날짜 localstorage에 저장하기 */
    setTodayDateState : (nowToday) => {
        localStorage.setItem('today', nowToday);
        set({ today : nowToday })
    },
    /** localstorage에 저장된 날짜 불러오기 */
    loadTodayDateState : () => {
        let storedDate = localStorage.getItem('today');
        if(!storedDate){
            storedDate = NOW;
            localStorage.setItem('today', storedDate);
        }
        set({ today : storedDate })
    }
}));

interface AlertBoxStoreType {
    alert: number;
    setAlertState: () => void;
}

/** Header 컴포넌트 alert 창 관리하는 store */
export const useAlertBoxState = create<AlertBoxStoreType>((set) => ({
    alert : 0,
    setAlertState : () => {
        set((state) => (
            { alert : state.alert + 1 }
        ));
    }
}))

interface SettingObjType {
    [key :string] : boolean
}

const DEFAULT_SETTING  :SettingObjType= {
    darkmode : false,
    try : true,
    time : true,
    sim : true,
}

interface SettingStateStoreType {
    setting : SettingObjType;
    setSettingState: (checkedVale : SettingObjType) => void;
}

export const useSettingState = create<SettingStateStoreType>((set) => ({
    setting : DEFAULT_SETTING,
    setSettingState : (checkedVale) => {
        set((state) => {
            const newSetting = {
                ...state.setting, 
                ...checkedVale
            };

            return { setting: newSetting };
        });
    },
}))

interface PlayTimeStoreType {
    playtime: number|null;
    setPlayTimeState: (nowplaytime: number) => void;
    loadPlayTimeState: () => void;
}

const DEFAULT_PLAYTIME :number|null = null;

/** 플레이타임을 저장하는 store */
export const usePlayTimeLocalstorage = create<PlayTimeStoreType>((set) => ({
    playtime : DEFAULT_PLAYTIME,
    /** 오늘 날짜 localstorage에 저장하기 */
    setPlayTimeState : (nowplaytime) => {
        localStorage.setItem('playtime', JSON.stringify(nowplaytime));
        set({ playtime : nowplaytime })
    },
    /** localstorage에 저장된 날짜 불러오기 */
    loadPlayTimeState : () => {
        let storedPlayTime = localStorage.getItem('playtime');
        let parsedPlayTime :number = 0;
        if(!storedPlayTime){
            parsedPlayTime = 0;
            localStorage.setItem('playtime', JSON.stringify(parsedPlayTime));
        }else{
            parsedPlayTime = parseInt(storedPlayTime);
        }
        set({ playtime : parsedPlayTime })
    }
}));

/** 기본 다크모드 설정 */
const DEFAULT_MODE = { mode: 'light' };

/** Zustand 스토어 생성 */
export const useNowMode = create<{
    nowMode: { mode: string };
    setNowMode: (mode: { mode: string }) => void;
}>((set) => ({
    nowMode: DEFAULT_MODE,
    setNowMode: (mode) => set({ nowMode: mode }),
}));

/** 기본 userdata 값 설정 */
const DEFAULT_USERDATA = undefined;

/** userdata store type */
interface UserDataStoreType {
    nowUserData: UserDataType | undefined;
    setNowUserData: (userdata: (UserDataType | undefined)) => void;
}

/** zustand store */
export const useUserData = create<UserDataStoreType>((set) => ({
    nowUserData: DEFAULT_USERDATA,
    setNowUserData: (userdata) => set({ nowUserData : userdata }),
}));
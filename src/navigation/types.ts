import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Trial: {
    trialId?: string;
    selectedDate?: string;
  } | undefined;
  Wallet: undefined;
  Account: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TrialScreenProps = AppTabScreenProps<'Trial'>;
export type HomeScreenProps = AppTabScreenProps<'Home'>;
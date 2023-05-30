import {　
  createContext,
  FC,
  ReactNode,
  useState,
  useReducer,
  Dispatch,
	SetStateAction,
} from "react";

import { State } from "../interfaces";
import { reducer } from '../store/reducer'

type Props = {
children: ReactNode;
};

export const Context = createContext(
	{} as {
		context: State;
		setContext: Dispatch<SetStateAction<State>>;
	}
);

export const ContextProvider: FC<Props> = (props) => {
	const { children } = props;

	// タスクを配列で保持するState(初期値: 空の配列[])
  const [context, setContext] = useState<State>({
    USER_ID:'',
    EMAIL:'',
  });

	// TaskListContextの中にProviderがあるため、childrenを囲む
	// valueにグローバルに扱う値を設定
	return (
		<Context.Provider value={{ context, setContext }}>
			{children}
		</Context.Provider>
	);
};

import {create} from "zustand/react";
import {DeepPartial} from "@apollo/client/utilities";
import {User} from "@/__generated__/graphql.ts";
import {gql} from "@/__generated__";
import client from "../apollo";

type Profile = DeepPartial<User>;

interface AuthState {
  loginDialogShow: boolean,
  showLoginDialog: () => void;
  hideLoginDialog: () => void;
  profile: Profile | undefined,
  getProfile: () => Promise<void>;
}

const PROFILE = gql(/* GraphQL */`
    query ProfileByAuth {
        profileByAuth {
            id
            fullname
            avatar
        }
    }
`);

export const userAuthStore = create<AuthState>((set) => {
  return {
    loginDialogShow: false,
    showLoginDialog: () => set({loginDialogShow: true}),
    hideLoginDialog: () => set({loginDialogShow: false}),
    profile: undefined,
    getProfile: async () => {
      const result = await client.query({
        query: PROFILE,
      });
      set({profile: result.data.profileByAuth});
    }
  };
});

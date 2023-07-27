import { useRouter } from 'next/router';
import {
  ParentStatusLabel,
  NavProfileContainer,
  ProfileName,
  ProfileTextContainer,
  UserAvatar,
} from './NavProfile.styled';

export interface NavProfileProps {
  name: string | null | undefined;
  enableProfileLink: boolean;
  targetUrl?: string | undefined;
  active?: boolean;
  profileType?: string;
  image?: string;
}

export const NavProfile: React.FC<NavProfileProps> = (
  props: NavProfileProps
) => {
  const router = useRouter();
  const {
    name = '',
    profileType,
    enableProfileLink,
    targetUrl = undefined,
    active = false,
    image,
  } = props;

  return (
    <NavProfileContainer
      onClick={
        targetUrl
          ? () => enableProfileLink && router.push(targetUrl)
          : undefined
      }
      linkEnabled={enableProfileLink}
    >
      {/* @TODO, link the avatar to the user's profile picture */}
      <UserAvatar data-testid="profile-avatar" active={active} src={image} />
      <ProfileTextContainer>
        <ProfileName
          variant="body1"
          fontWeight="semibold"
          data-testid="profile-name"
        >
          {name}
        </ProfileName>
        {profileType && (
          <ParentStatusLabel
            sx={{ borderRadius: 2 }}
            label={profileType}
            data-testid="user-type"
          />
        )}
      </ProfileTextContainer>
    </NavProfileContainer>
  );
};

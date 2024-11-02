import { useContext } from 'react';
import styled from '@emotion/native';
import { useAppSelector } from '../../../store/hooks';
import { PlayerHubContext } from '.';

const users = {
  black: {
    avatar: require('../../../assets/profile_test/avatar2.png'),
    frame: require('../../../assets/profile_frames/frame2.png'),
    nickname: 'IA Easy',
  },
  white: {
    avatar: require('../../../assets/profile_test/avatar1.png'),
    frame: require('../../../assets/profile_frames/frame1.png'),
    nickname: 'samurayjedi',
  },
} as const;

export default function Profile() {
  const turn = useAppSelector((state) => state.chess.board.turn);
  const { variant } = useContext(PlayerHubContext);

  return (
    <>
      <Avatar>
        <AvatarIcon source={users[variant].avatar} />
        <AvatarFrame source={users[variant].frame} />
      </Avatar>
      <ProfileInfo>
        <Username>{users[variant].nickname}</Username>
        <Points>
          {turn === variant && variant === 'white' ? 'You turn - ' : ''}
          1245
          {turn === variant && variant === 'black' ? ' - You turn' : ''}
        </Points>
      </ProfileInfo>
    </>
  );
}

const avatarSize = 60;
const Avatar = styled.View({
  position: 'relative',
  width: avatarSize,
  height: avatarSize,
  alignItems: 'center',
  justifyContent: 'center',
});

const AvatarFrame = styled.Image({
  width: avatarSize,
  height: avatarSize,
  resizeMode: 'cover',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const AvatarIcon = styled.Image({
  width: avatarSize - 18,
  height: avatarSize - 18,
  resizeMode: 'cover',
});

const ProfileInfo = styled.View(() => {
  const { variant } = useContext(PlayerHubContext);

  return {
    alignItems: variant === 'black' ? 'flex-start' : 'flex-end',
    justifyContent: 'center',
    ...(variant === 'black' ? { paddingLeft: 5 } : { paddingRight: 5 }),
    height: avatarSize,
  };
});

const Username = styled.Text({
  color: 'white',
  fontFamily: 'TurretRoad-ExtraBold',
});

const Points = styled.Text({
  color: '#d2a562',
  fontFamily: 'TurretRoad-Bold',
});

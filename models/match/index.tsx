import Player from '@/models/player';

export default interface Match {
    matchId: string;
    playerA: Player;
    playerB: Player;
    scoreA: number;
    scoreB: number;
}

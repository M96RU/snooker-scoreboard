import Player from '@/models/player';

export default interface Match {
    id: string;
    status: string;
    round: number;
    playerA: Player;
    playerB: Player;
    scoreA: number;
    scoreB: number;
    raceTo: number;
}

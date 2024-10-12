import Player from '@/models/player';

export default interface MatchData {
    id: string;
    tournamentId: string;
    organization: string;

    status: string;
    round: number;
    playerA: Player;
    playerB: Player;
    scoreA: number;
    scoreB: number;
    raceTo: number;

    tableId: string;
    tableName: number;

    starttime: Date;
    stoptime: Date;
}

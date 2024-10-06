import React, {useCallback, useMemo, useState} from 'react';
import {useCSVReader} from 'react-papaparse';
import {AlertCircle} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '../components/ui/alert';
import {Button} from '../components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../components/ui/tabs';
import {Textarea} from '../components/ui/textarea';
import {Label} from '../components/ui/label';
import {Slider} from '../components/ui/slider';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const distributePlayersBySkillAndPosition = (players, numTeams) => {
    const teams = Array.from({length: numTeams}, () => []);
    const skillLevels = [...new Set(players.map(player => player['Skill Level']))];

    const playersBySkill = skillLevels.map(skill =>
        shuffleArray(players.filter(player => player['Skill Level'] === skill))
    );

    let currentTeamIndex = 0;
    const flattenedPlayers = playersBySkill.flat();

    for (let i = 0; i < flattenedPlayers.length; i++) {
        teams[currentTeamIndex].push(flattenedPlayers[i]);
        currentTeamIndex = (currentTeamIndex + 1) % numTeams;
    }

    return teams;
};

const isHeaderRow = (row) => {
    return row.some(cell =>
        typeof cell === 'string' &&
        ['full name', 'preferred position', 'skill level'].includes(cell.toLowerCase().trim())
    );
};

const generateColors = (count) => {
    const hueStep = 360 / count;
    return Array.from({length: count}, (_, i) => {
        const hue = i * hueStep;
        return `hsl(${hue}, 70%, 60%)`;
    });
};

const toolDescription = <>This tool helps you create teams based on the skill levels of the players. <br/>You can
    either enter player data manually or upload a CSV file. <br/>The tool will then try to EQUALLY
    distribute the players across the teams based on their skill levels and preferred positions.</>;

const TeamGen = () => {
    const [players, setPlayers] = useState([]);
    const [numTeams, setNumTeams] = useState(2);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');
    const [manualInput, setManualInput] = useState('');
    const [activeTab, setActiveTab] = useState('manual');
    const [darkMode, setDarkMode] = useState(false);
    const {CSVReader} = useCSVReader();

    const skillLevels = useMemo(() =>
            [...new Set(players.map(player => player['Skill Level']))],
        [players]
    );

    const parsePlayerData = (data) => {
        const separator = data.includes('\t') ? '\t' : ',';
        const rows = data.split('\n').filter(row => row.trim() !== '');

        // Check if the first row is a header
        const isHeader = rows[0].toLowerCase().includes('full name') ||
            rows[0].toLowerCase().includes('preferred position') ||
            rows[0].toLowerCase().includes('skill level');

        const startIndex = isHeader ? 1 : 0;

        return rows.slice(startIndex).map(row => {
            const [fullName, preferredPosition, skillLevel] = row.split(separator).map(item => item.trim());
            return {'Full Name': fullName, 'Preferred Position': preferredPosition, 'Skill Level': skillLevel};
        });
    };

    const handleCSVUpload = useCallback((results) => {
        let parsedPlayers = parsePlayerData(results.data.map(row => row.join(',')).join('\n'));

        if (isHeaderRow(parsedPlayers[0])) {
            parsedPlayers = parsedPlayers.slice(1);
        }

        parsedPlayers = parsedPlayers.map(row => ({
            'Full Name': row[0],
            'Preferred Position': row[1],
            'Skill Level': row[2]
        }));

        setPlayers(parsedPlayers);
        setError('');
    }, []);

    const handleCSVError = useCallback((error) => {
        setError(`Error parsing CSV: ${error.message}`);
    }, []);

    const handleManualInput = () => {
        const parsedPlayers = parsePlayerData(manualInput);
        setPlayers(parsedPlayers);
        setError('');
    };

    const skillColors = useMemo(() => {
        const colors = generateColors(skillLevels.length);
        return Object.fromEntries(skillLevels.map((level, index) => [level, colors[index]]));
    }, [skillLevels]);

    const handleFormTeams = () => {
        if (players.length === 0) {
            setError('Please upload a CSV file or enter player data manually first.');
            return;
        }
        if (numTeams <= 0 || numTeams > players.length) {
            setError('Invalid number of teams.');
            return;
        }
        const formedTeams = distributePlayersBySkillAndPosition(players, numTeams);
        setTeams(formedTeams);
        setError('');
    };

    const handleSliderChange = (value) => {
        setNumTeams(value[0] * 2);
    };

    const sortedTeams = useMemo(() => {
        return teams.map(team =>
            [...team].sort((a, b) =>
                skillLevels.indexOf(b['Skill Level']) - skillLevels.indexOf(a['Skill Level'])
            )
        );
    }, [teams, skillLevels]);

    return (
        <main>
            {/*<div className={`min-h-screen w-full ${darkMode ? 'dark' : ''}`}>*/}
            {/*<div className="fixed inset-0 bg-white dark:bg-gray-900 transition-colors duration-200"/>*/}
            <section
                className="flex flex-col self-center mt-10 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
                <div className="relative min-h-screen w-full overflow-auto"> {/* Scrollable content container */}
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="flex flex-row items-">
                            <h1 className="self-start text-4xl font-bold tracking-tighter leading-none mb-10">
                                Team Gen Tool
                            </h1>
                        </div>
                        <section className="mb-12 text-sm text-gray-500 dark:text-gray-400 ">
                            {toolDescription}
                        </section>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                            <TabsList>
                                <TabsTrigger value="manual">Manual Input</TabsTrigger>
                                <TabsTrigger value="csv">CSV Upload</TabsTrigger>
                            </TabsList>
                            <TabsContent value="manual">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Manual Input</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            value={manualInput}
                                            onChange={(e) => setManualInput(e.target.value)}
                                            placeholder="Enter player data here (format: Full Name, Preferred Position, Skill Level)&#10;Example:&#10;John Doe, Forward, Beginner&#10;Jane Doe, Goalkeeper, Intermediate&#10;"
                                            className="h-64"
                                        />
                                        <Button onClick={handleManualInput} className="mt-2">
                                            Process Manual Input
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="csv">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>CSV Upload</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CSVReader
                                            onUploadAccepted={handleCSVUpload}
                                            onUploadRejected={handleCSVError}
                                            config={{
                                                header: false,
                                                dynamicTyping: true,
                                                skipEmptyLines: true,
                                            }}>
                                            {({getRootProps, acceptedFile, ProgressBar, getRemoveFileProps}) => (
                                                <>
                                                    <div
                                                        {...getRootProps()}
                                                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 text-center cursor-pointer">
                                                        {acceptedFile ? (
                                                            <>
                                                                <div>{acceptedFile.name}</div>
                                                                <Button {...getRemoveFileProps()}
                                                                        variant="destructive"
                                                                        className="mt-2">
                                                                    Remove
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <span
                                                                className="text-sm">Drop CSV file here or click to upload.</span>
                                                        )}
                                                    </div>
                                                    <ProgressBar/>
                                                </>
                                            )}
                                        </CSVReader>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="mb-4">
                            <Label htmlFor="numTeams" className="block mb-2 dark:text-white">Number of
                                Teams: {numTeams}</Label>
                            <Slider
                                id="numTeams"
                                min={1}
                                max={32}
                                step={1}
                                value={[numTeams / 2]}
                                onValueChange={handleSliderChange}
                                className="w-full"
                            />
                        </div>

                        <Button onClick={handleFormTeams}>
                            Form Teams
                        </Button>

                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {players.length > 0 && (
                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Detected Skill Levels</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside">
                                        {skillLevels.map((level, index) => (
                                            <li key={index}>{level}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {sortedTeams.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4">Formed Teams</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sortedTeams.map((team, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>Team {index + 1}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul>
                                                    {team.map((player, playerIndex) => (
                                                        <li
                                                            key={playerIndex}
                                                            className="mb-1 p-1 rounded"
                                                            style={{
                                                                backgroundColor: skillColors[player['Skill Level']],
                                                                color: darkMode ? 'black' : 'white'
                                                            }}>
                                                            {player['Full Name']} - {player['Preferred Position']} ({player['Skill Level']})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/*</div>*/}
        </main>
    );
};

export default TeamGen;
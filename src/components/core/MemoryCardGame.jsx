import React, { useState, useEffect } from 'react';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"


const ICONS = ['🚀', '💻', '🔧', '🔍', '📊', '🌐', '📱', '🔐'];

const MemoryCardGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledIcons = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon }));
        setCards(shuffledIcons);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);
        setMoves(moves + 1);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            if (cards[firstId].icon === cards[secondId].icon) {
                setSolved([...solved, firstId, secondId]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    const isGameComplete = solved.length === cards.length;

    return (
        <div className="flex flex-col items-center">
            <Badge variant="secondary" className="mb-4 text-lg">Moves: {moves}</Badge>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        className={`w-16 h-16 flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
                            flipped.includes(card.id) || solved.includes(card.id)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {flipped.includes(card.id) || solved.includes(card.id) ? card.icon : '?'}
                    </Card>
                ))}
            </div>
            {isGameComplete && (
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Congratulations! You've completed the game!</h3>
                    <p className="mb-4">Total moves: {moves}</p>
                    <Button onClick={initializeGame}>
                        Play Again
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MemoryCardGame;
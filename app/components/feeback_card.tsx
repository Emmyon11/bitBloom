'use client';
import { Card, CardContent } from '@/components/ui/card';
import { data } from '@/utils/feedback_data';
import { da } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';

type Props = {};

const FeedbackCard = (props: Props) => {
  const [isfeedback, setIsFeedback] = useState(false);
  const [currFeedback, setcurrFeedback] = useState<Feedback>();

  useEffect(() => {
    if (currFeedback) return;
    setInterval(() => {
      setIsFeedback(false);
      setTimeout(() => setIsFeedback(true), 15000);
      const rand = Math.floor(Math.random() * 100);
      setcurrFeedback(data[rand]);
    }, 20000);

    return clearInterval(currFeedback);
  }, []);

  return (
    <div>
      <Card
        className={
          isfeedback ? 'bg-opacity-50 bg-green-200 text-primary ' : 'hidden'
        }
      >
        <CardContent>
          <h1>{currFeedback && currFeedback.name}</h1>
          <p>{currFeedback && currFeedback.feedback}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackCard;

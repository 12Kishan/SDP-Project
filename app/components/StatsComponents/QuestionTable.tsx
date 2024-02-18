'use client'
import React from 'react'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

type Props = {
    questions: any,
    questionUser: any
}
function QuestionTable({ questions, questionUser }: Props) {
    console.log(questions);
    return (
        <>
            <CTable>
                <CTableHead>
                    <CTableRow className='text-white bg-gray-900 p-2'>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Question & Correct answer</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Your answer</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {questions.map((question: any, index: number) => (
                        <CTableRow key={index} className={`text-gray-900 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                            <CTableHeaderCell scope="row" className="pr-4">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>
                                {question.question}
                                <br />Correct Answer:
                                <span className="font-semibold"> {question.answer}</span>
                            </CTableDataCell>
                            <CTableDataCell className={`pl-4 ${questionUser[index].isCorrect ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}`}>
                                {questionUser[index].userAnswer}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    );
}

export default QuestionTable;
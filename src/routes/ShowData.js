import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import style from './AddData.module.css'
import style2 from './ShowData.module.css'
import { Card } from '@material-ui/core'

export default function ShowData(props) {
  const { relatorioRegistros } = props

  const formatDate = (dateString) => {
    if(dateString == "" || dateString == undefined)
      return undefined

    const dateObj = new Date(dateString)
    
    const date = dateObj.getDate()
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDate = new Date().getDate()
    let age = currentYear - year
    age = currentDate >= date && currentMonth >= month ? age : age - 1

    return `${date}/${month + 1}/${year} ${age}yrs`
  }
  return (
    <div className={style2.showDataContainer}>
      <Card className={style2.card}>
        <h2 className={style.h2}>Peças Registradas</h2>
        <TableContainer component={Paper}>
          <Table className={style.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Data de Nasc.</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Tamanho</TableCell>
                <TableCell>Cor</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Modalidade</TableCell>
                <TableCell style={{minWidth:'200px'}}>Info. Adicionais</TableCell>
                <TableCell>Data de Compra</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relatorioRegistros.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{formatDate(row.birthDate)}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row._address}</TableCell>
                  <TableCell>{row.tamanho}</TableCell>
                  <TableCell>{row.cor}</TableCell>
                  <TableCell>{row.modalidade}</TableCell>
                  <TableCell>{row.diseaseName}</TableCell>
                  <TableCell>{row.infos}</TableCell>
                  <TableCell>{formatDate(row.diseaseStartedOn)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

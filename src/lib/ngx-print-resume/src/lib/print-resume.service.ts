import { TitleCasePipe } from '@angular/common'
import { Injectable } from '@angular/core'
import { jsPDF } from 'jspdf'
import { formTranslated } from 'lib/ngx-filtering/src/lib/@utils/form.translate'

import { ZipCodePipe } from './@pipes/zip-code.pipe'
import { fonts } from './@utils/fonsts'
import { formatPhoneNumber } from './@utils/format-number'

@Injectable({
  providedIn: 'root',
})
export class PrintResumeService {
  constructor() {}

  print(resume: any) {
    var doc = new jsPDF()
    let actualPositionY = 0
    let pmpLogo = new Image()
    pmpLogo.src = '../../../../assets/images/pmp.png'
    doc.addImage(pmpLogo, 'PNG', 160, 7, 30, 30)
    let coordLogo = new Image()
    coordLogo.src = '../../../../assets/images/coordenadoria-do-trabalho.png'
    doc.addImage(coordLogo, 'PNG', 20, 8, 23, 23)
    let bmpeLogo = new Image()
    bmpeLogo.src = '../../../../assets/images/logo-to-print.png'
    doc.addImage(bmpeLogo, 'PNG', 88, 8, 30, 30)
    //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
    doc.addFileToVFS('Montserrat-Bold.ttf', fonts.bold)
    doc.addFileToVFS('Montserrat-Regular.ttf', fonts.regular)
    doc.addFont('Montserrat-Bold.ttf', 'montserrat-bold', 'normal')
    doc.addFont('Montserrat-Regular.ttf', 'montserrat-regular', 'normal')
    doc.setFontSize(14)
    doc.setTextColor('#323232')
    /**@description Set fonts and use;*/
    doc.setFont('montserrat-bold')
    doc.text(`${resume.physicalPerson.name}`.toLocaleUpperCase(), 20, 43)
    doc.setFontSize(12)
    doc.rect(20, 50, 170, 1, 'DF')
    /** @description Set header info*/

    /**@description Add personal info*/
    doc.setFont('montserrat-bold')
    doc.text(`dados pessoais`.toLocaleUpperCase(), 20, 65)
    doc.rect(20, 70, 20, 1.5, 'DF')
    doc.text(`Sexo:`, 20, 80)
    doc.text(`Data de Nascimento:`, 20, 87)
    doc.text(`Estado Civil:`, 20, 94)
    doc.text(`Dependentes:`, 20, 101)
    doc.text(`Pessoa com Deficiência:`, 20, 108)
    doc.text(`Habilitação:`, 20, 115)

    doc.text(`Rua:`, 20, 132)
    doc.text(`Bairro:`, 20, 139)
    doc.text(`Cidade:`, 20, 146)
    doc.text(`CEP:`, 20, 157)

    doc.text(`Telefone(s):`, 20, 164)
    doc.text(`E-mail:`, 20, 171)
    doc.setFont('montserrat-regular')
    let titleCase = new TitleCasePipe()
    doc.text(`${titleCase.transform(resume.physicalPerson.sex)}`, 33, 80)
    doc.text(`${resume.physicalPerson.birthDate}`, 68, 87)
    doc.text(`${resume.physicalPerson.maritalStatus}`, 48, 94)

    doc.text(
      resume.physicalPerson.hasDependent
        ? `${resume.physicalPerson.dependents.length}`
        : `Não possui`,
      53,
      101
    )
    doc.text(
      `${
        resume.physicalPerson.isPCD
          ? 'Sim ' + '(' + resume.physicalPerson.disability + ')'
          : 'Não'
      }`,
      75,
      108
    )
    let typesCNH = resume.physicalPerson.cnhCategory
    let textCNH = `${typesCNH['catA'] ? 'A, ' : ''}${
      typesCNH['catB'] ? 'B, ' : ''
    }${typesCNH['catC'] ? 'C, ' : ''}${typesCNH['catD'] ? 'D, ' : ''}${
      typesCNH['catE'] ? 'E, ' : ''
    }`
    textCNH = textCNH.substr(0, textCNH.length - 2).concat('') // retira vírgula desnecessária
    let cnhInline = doc.splitTextToSize(`${textCNH}`, 60)
    // doc.text(`${cnhInline}`, 60, 115);
    doc.text(
      `${resume.physicalPerson.hasCNH ? `Sim (${cnhInline}) ` : `Não possui`}`,
      48,
      115
    )

    if (resume.physicalPerson.isYoungApprentice) {
      doc.setFont('montserrat-bold')
      actualPositionY += 80
      doc.text(`Jovem Aprendiz:`, 20, actualPositionY + 41)
      doc.setFont('montserrat-regular')
      doc.text('Sim', 59, actualPositionY + 41)
    }

    doc.text(
      `${resume.physicalPerson.address.street}, ${resume.physicalPerson.address.number}`,
      31,
      132
    )
    doc.text(`${resume.physicalPerson.address.neighborhood}`, 36, 139)
    doc.text(`${resume.physicalPerson.address.city}`, 38, 146)
    let zipCode = new ZipCodePipe()
    doc.text(
      `${zipCode.transform(resume.physicalPerson.address.zipCode)}`,
      32,
      157
    )
    ;(resume.physicalPerson.phoneNumbers as any[]).forEach(
      (numberInfo: any) => {
        numberInfo.number = ` ${formatPhoneNumber(numberInfo.number)}`
      }
    )
    let phoneNumbers = resume.physicalPerson.phoneNumbers
      .map((res: any) => res.number)
      .toString()
    doc.text(`${phoneNumbers}`, 46, 164)
    doc.text(`${resume.physicalPerson.email}`, 37, 171)
    /** @description Add objective section*/
    doc.setFont('montserrat-bold')
    doc.text(`Apresentação`.toLocaleUpperCase(), 20, 185)
    doc.rect(20, 189, 20, 1.5, 'DF')
    if (resume.presentation != null) {
      doc.setFont('montserrat-regular')
      let presentation = doc.splitTextToSize(`${resume.presentation}`, 175)
      doc.text(presentation, 20, 200)
    }
    /**@description Scholarity section */
    doc.setFont('montserrat-bold')
    doc.text(`escolaridade e cursos`.toLocaleUpperCase(), 20, 215)
    doc.rect(20, 220, 20, 1.5, 'DF')

    actualPositionY = 220
    for (let education of resume.educations) {
      doc.text(`Curso:`, 20, actualPositionY + 10)
      doc.setFont('montserrat-regular')
      doc.text(`${education.course}`, 36, actualPositionY + 10)
      doc.setFont('montserrat-bold')
      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      doc.text(`Instituição:`, 20, actualPositionY + 10)
      doc.setFont('montserrat-regular')
      doc.text(`${education.institution}`, 46, actualPositionY + 10)
      doc.setFont('montserrat-bold')
      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      if (education.scholarity) {
        doc.text(`Nível:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${education.scholarity}`, 34, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 10
        if (actualPositionY >= 262) {
          doc.addPage()
          ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
      }
      if (education.period) {
        doc.text(`Período:`, 20, actualPositionY + 6)
        doc.setFont('montserrat-regular')
        doc.text(
          `${education.period.start} ${
            education.period.end
              ? `até ${education.period.end}`
              : 'até o momento'
          }`,
          40,
          actualPositionY + 6
        )

        doc.setFont('montserrat-bold')
        actualPositionY += 9
      } else {
        actualPositionY += 3
      }
      if (actualPositionY >= 262) {
        doc.addPage()
        ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
    }

    /**@description Extra activities section */
    if (resume.extraActivities.length > 0) {
      doc.text(`Atividades Complementares:`, 20, actualPositionY + 15)
      doc.setFillColor('#D9D9D9')
      doc.rect(90, actualPositionY + 13, 100, 1, 'F')
      actualPositionY += 15
      if (actualPositionY >= 262) {
        doc.addPage()
        ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      for (let activity of resume.extraActivities) {
        doc.text(`Título:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${activity.title}`, 35, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 7
        if (actualPositionY >= 262) {
          doc.addPage()
          ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
        doc.text(`Local:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${activity.location}`, 34, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 7
        if (actualPositionY >= 262) {
          doc.addPage()
          ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
        doc.text(`Carga horária:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${activity.workload}`, 52, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 7
        if (actualPositionY >= 262) {
          doc.addPage()
          ////doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
        doc.text(`Concluído em:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${activity.conclusion}`, 53, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 14
        if (actualPositionY >= 262) {
          doc.addPage()
          //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
      }
    }

    /**@description Languages section */
    if (resume.languages.length > 0) {
      doc.text(`Idiomas:`, 20, actualPositionY + 13)
      doc.setFillColor('#D9D9D9')
      doc.rect(45, actualPositionY + 11, 145, 1, 'F')
      actualPositionY += 13
      if (actualPositionY >= 262) {
        doc.addPage()
        //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      for (let language of resume.languages) {
        doc.text(`Título:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${language.title}`, 36, actualPositionY + 10)
        doc.setFont('montserrat-bold')
        actualPositionY += 7
        if (actualPositionY >= 262) {
          doc.addPage()
          //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
        doc.text(`Nível:`, 20, actualPositionY + 10)
        doc.setFont('montserrat-regular')
        doc.text(`${language.proficiency}`, 34, actualPositionY + 10)
        doc.setFont('montserrat-bold')

        actualPositionY += 13

        if (actualPositionY >= 262) {
          doc.addPage()
          //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
          actualPositionY = 15
        }
      }
    }

    /**@description Work experiences section */
    doc.text(
      `Experiências profissionais`.toLocaleUpperCase(),
      20,
      actualPositionY + 13
    )
    doc.rect(20, actualPositionY + 18, 20, 1.5, 'DF')
    actualPositionY += 18
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    for (let workExperience of resume.workExperiences) {
      doc.text(`Cargo:`, 20, actualPositionY + 10)
      doc.setFont('montserrat-regular')
      doc.text(`${workExperience.job.name}`, 36, actualPositionY + 10)
      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      doc.setFont('montserrat-bold')
      doc.text(`Empresa:`, 20, actualPositionY + 10)
      doc.setFont('montserrat-regular')
      doc.text(`${workExperience.company}`, 42, actualPositionY + 10)
      doc.setFont('montserrat-bold')
      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      doc.setFont('montserrat-bold')
      doc.text(`Período:`, 20, actualPositionY + 10)
      doc.setFont('montserrat-regular')
      doc.text(
        `${workExperience.period.start} ${
          workExperience.period.end
            ? `até ${workExperience.period.end}`
            : 'até o momento'
        }`,
        40,
        actualPositionY + 10
      )
      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }

      actualPositionY += 7
      if (actualPositionY >= 262) {
        doc.addPage()
        //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
        actualPositionY = 15
      }
      doc.setFont('montserrat-bold')
    }

    /**@description Work experiences section */
    doc.text(
      `Informações complementares`.toLocaleUpperCase(),
      20,
      actualPositionY + 13
    )
    actualPositionY += 10
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    doc.rect(20, actualPositionY + 7, 20, 1.5, 'DF')
    actualPositionY += 17
    doc.text(`Disponibilidade por Turno:`, 20, actualPositionY)
    doc.setFont('montserrat-regular')
    let willingness = resume.physicalPerson.willingness
    doc.text(this.checkWillingness(resume.physicalPerson), 80, actualPositionY)
    doc.setFont('montserrat-bold')
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    doc.text(`Disponibilidade no Final de Semana:`, 20, actualPositionY + 10)
    doc.setFont('montserrat-regular')
    doc.text(
      resume.physicalPerson.willingness.saturday ||
        resume.physicalPerson.willingness.sunday
        ? `Sim` + resume.physicalPerson.willingness.saturday &&
          !resume.physicalPerson.willingness.sunday
          ? `Apenas Sábado`
          : `Apenas Domingo`
        : `Não`,
      102,
      actualPositionY + 10
    )
    doc.setFont('montserrat-bold')
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    doc.text(`Disponibilidade para Viagens:`, 20, actualPositionY + 20)
    doc.setFont('montserrat-regular')
    doc.text(
      `${willingness['travel'] ? 'Sim' : 'Não'}`,
      87,
      actualPositionY + 20
    )
    actualPositionY += 10
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    doc.setFont('montserrat-bold')
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }
    doc.text(`Possui Veículo Próprio: `, 20, actualPositionY + 20)
    doc.setFont('montserrat-regular')
    doc.text(
      resume.physicalPerson.hasVehicle
        ? `Sim | ` + this.checkVehicles(resume.physicalPerson)
        : `Não`,
      73,
      actualPositionY + 20
    )
    actualPositionY += 10
    if (actualPositionY >= 262) {
      doc.addPage()
      //doc.addImage(images.mark, 'PNG', 10, 55, 190, 190);
      actualPositionY = 15
    }

    if (resume.additionalInformation != null) {
      let observation = doc.splitTextToSize(resume.additionalInformation, 200)
      if (observation != null && observation != '') {
        doc.setFont('montserrat-bold')
        doc.text(`Observações:`, 20, actualPositionY + 20)

        doc.setFont('montserrat-regular')
        doc.text(`${observation}`, 51, actualPositionY + 20)
        actualPositionY += 10
      }
    }

    doc.autoPrint()
    doc.setProperties({
      title: `Currículo de ${resume.physicalPerson.name}`,
    })
    const blob = doc.output('bloburl')
    window.open(blob as any)
  }

  private checkWillingness(p: any): string {
    const willingnessList: string[] = []

    if (p.willingness?.morning) {
      willingnessList.push(formTranslated.morning)
    }
    if (p.willingness?.afternoon) {
      willingnessList.push(formTranslated.afternoon)
    }
    if (p.willingness?.night) {
      willingnessList.push(formTranslated.night)
    }

    return willingnessList.join(', ')
  }

  private checkVehicles(p: any): string {
    const vehicilesList: string[] = []
    if (p.vehicles) {
      p.vehicles.forEach((v: any) => {
        vehicilesList.push(v.vehicleType)
      })
    }
    return vehicilesList.join(', ')
  }
}

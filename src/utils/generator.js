export function generateCV(profile) {
  const english = profile.language === 'English';
  if (english) {
    return `${profile.fullName || 'Full Name'}\n\nProfessional Profile\n${profile.profession || 'Professional'} applying for ${profile.jobTitle || 'the selected position'}. Organized, responsible, and focused on quality results.\n\nEducation\n${profile.education || 'Add your education here.'}\n\nExperience\n${profile.experience || 'Add your professional experience here.'}\n\nSkills\n${profile.skills || 'Communication, teamwork, organization, Microsoft Office.'}`;
  }

  return `${profile.fullName || 'Nome Completo'}\n\nPerfil Profissional\n${profile.profession || 'Profissional'} com interesse na posição de ${profile.jobTitle || 'cargo pretendido'}. Perfil organizado, responsável e orientado para resultados de qualidade.\n\nFormação Académica\n${profile.education || 'Adicione a sua formação aqui.'}\n\nExperiência Profissional\n${profile.experience || 'Adicione a sua experiência aqui.'}\n\nCompetências\n${profile.skills || 'Comunicação, trabalho em equipa, organização e Microsoft Office.'}`;
}

export function generateCoverLetter(profile) {
  const english = profile.language === 'English';
  if (english) {
    return `Dear Hiring Team,\n\nI am writing to express my interest in the ${profile.jobTitle || 'available'} position at ${profile.company || 'your company'}. I believe my background in ${profile.profession || 'my professional field'} and my skills can contribute positively to your team.\n\nMy education includes ${profile.education || 'relevant academic training'}, and my experience includes ${profile.experience || 'activities related to the position'}. I also bring skills such as ${profile.skills || 'communication, organization and teamwork'}.\n\nKind regards,\n${profile.fullName || 'Your Name'}`;
  }

  return `Exmos. Senhores,\n\nVenho por este meio manifestar o meu interesse na vaga de ${profile.jobTitle || 'cargo disponível'} na ${profile.company || 'vossa empresa'}. Tenho experiência/interesse na área de ${profile.profession || 'atuação profissional'} e acredito que posso contribuir positivamente para a vossa equipa.\n\nA minha formação inclui ${profile.education || 'formação relevante'}, e a minha experiência inclui ${profile.experience || 'atividades relacionadas com a vaga'}. Destaco competências como ${profile.skills || 'comunicação, organização e trabalho em equipa'}.\n\nCom os melhores cumprimentos,\n${profile.fullName || 'Seu Nome'}`;
}

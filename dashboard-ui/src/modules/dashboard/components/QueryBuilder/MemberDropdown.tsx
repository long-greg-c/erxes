import { Menu } from 'antd';
import { ignoredFilters } from 'modules/dashboard/constants';
import React from 'react';
import ButtonDropdown from './ButtonDropdown';

const generateMember = (availableMembers, schemaType, isFilter) => {
  const generatedMembers = [] as any;

  if (availableMembers) {
    if (isFilter) {
      availableMembers.forEach(members => {
        const name = members.name;

        if (
          !ignoredFilters.includes(name.split('.')[1]) &&
          name.startsWith(schemaType)
        ) {
          generatedMembers.push(members);
        }
      });
    } else {
      availableMembers.forEach(members => {
        const name = members.name;

        if (name.startsWith(schemaType)) {
          generatedMembers.push(members);
        }
      });
    }
  }

  return generatedMembers;
};

const memberMenu = (onClick, availableMembers, schemaType, isFilter) => {
  const generatedMembers = generateMember(
    availableMembers,
    schemaType,
    isFilter
  ) as any[];

  return (
    <Menu>
      {generatedMembers.length ? (
        generatedMembers.map(m => (
          <Menu.Item key={m.name} onClick={() => onClick(m)}>
            {m.title}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled={true}>No members found</Menu.Item>
      )}
    </Menu>
  );
};

const MemberDropdown = ({
  onClick,
  availableMembers,
  schemaType,
  isFilter = false,
  ...buttonProps
}) => (
  <ButtonDropdown
    overlay={memberMenu(onClick, availableMembers, schemaType, isFilter)}
    {...buttonProps}
  />
);

export default MemberDropdown;

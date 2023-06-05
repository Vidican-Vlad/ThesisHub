const [studyCycle, setStudyCycle] = useState("");
const [targetUser, setTargetUser ] = useState("");

function resetFilters(){
    setTagsList([]);
    setTargetUser([]);
}

<RadioGroup>
    <VStack align={"start"}>
        <Radio value = 'Licenta'>Bachelor's Degree</Radio>
        <Radio value = "Master">Master's Degree</Radio>
    </VStack>
</RadioGroup>
